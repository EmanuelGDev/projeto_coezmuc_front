import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/Context";

// ----- Types -----

export type FinanceRecord = {
  _id: string;
  type: string;
  description: string;
  date: string;
  value: number;
  readonly?: boolean;
};

export type FinanceModule = "revenue" | "expense";

export type TypeSummary = {
  type: string;
  total: number;
  records: FinanceRecord[];
};

// ----- Helpers -----

const BASE_URL = import.meta.env.VITE_API_KEY ?? "http://localhost:3333";

function authHeaders(token: string, withBody = true): HeadersInit {
  return {
    ...(withBody && { "Content-Type": "application/json" }),
    Authorization: `Bearer ${token}`,
  };
}

export function groupByType(records: FinanceRecord[]): TypeSummary[] {
  const map = new Map<string, TypeSummary>();

  for (const record of records) {
    if (!map.has(record.type)) {
      map.set(record.type, { type: record.type, total: 0, records: [] });
    }
    const entry = map.get(record.type)!;
    entry.total += record.value;
    entry.records.push(record);
  }

  return Array.from(map.values()).sort((a, b) => b.total - a.total);
}

// ----- Hook -----

export function useFinance(module: FinanceModule) {
  const { user } = useAuth();

  const [records, setRecords] = useState<FinanceRecord[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = useCallback(async () => {
    if (!user?.token) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/${module}`, {
        headers: authHeaders(user.token, false),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: FinanceRecord[] = await res.json();
      setRecords(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [module, user?.token]);

  const fetchTypes = useCallback(async () => {
    if (!user?.token) return;
    try {
      const res = await fetch(`${BASE_URL}/${module}/types`, {
        headers: authHeaders(user.token, false),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: string[] = await res.json();
      setTypes(data);
    } catch {
      // Não bloqueia a UI
    }
  }, [module, user?.token]);

  const fetchSubscriptionRevenue = useCallback(async () => {
    if (module !== "revenue" || !user?.token) return;

    try {
      const res = await fetch(`${BASE_URL}/subscription/revenue-summary`, {
        headers: authHeaders(user.token, false),
      });
      if (!res.ok) return;

      const json = await res.json();
      const { total, count } = json.data as { total: number; count: number };

      if (total <= 0) return;

      const syntheticRecord: FinanceRecord = {
        _id: "synthetic-subscriptions",
        type: "Inscrições",
        description: `${count} inscrição${count !== 1 ? "s" : ""} com pagamento registrado`,
        date: new Date().toISOString(),
        value: total,
        readonly: true,
      };

      setRecords((prev) => {
        const withoutSynthetic = prev.filter((r) => r._id !== "synthetic-subscriptions");
        return [...withoutSynthetic, syntheticRecord];
      });
    } catch {
      // Falha silenciosa
    }
  }, [module, user?.token]);

  useEffect(() => {
    Promise.all([fetchRecords(), fetchTypes()]).then(() => {
      fetchSubscriptionRevenue();
    });
  }, [fetchRecords, fetchTypes, fetchSubscriptionRevenue]);

  const create = useCallback(
    async (data: Omit<FinanceRecord, "_id">) => {
      if (!user?.token) throw new Error("Não autenticado");

      const res = await fetch(`${BASE_URL}/${module}/create`, {
        method: "POST",
        headers: authHeaders(user.token),
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      const created: FinanceRecord = json.data ?? json; // unwrap { data }
      setRecords((prev) => [...prev, created]);
    },
    [module, user?.token]
  );

  const update = useCallback(
    async (id: string, data: Partial<Omit<FinanceRecord, "_id">>) => {
      if (!user?.token) throw new Error("Não autenticado");

      const res = await fetch(`${BASE_URL}/${module}/update/${id}`, {
        method: "PUT",
        headers: authHeaders(user.token),
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      const updated: FinanceRecord = json.data ?? json; // unwrap { data }
      setRecords((prev) => prev.map((r) => (r._id === id ? updated : r)));
    },
    [module, user?.token]
  );

  const remove = useCallback(
    async (id: string) => {
      if (!user?.token) throw new Error("Não autenticado");

      const res = await fetch(`${BASE_URL}/${module}/delete/${id}`, {
        method: "DELETE",
        headers: authHeaders(user.token, false), // sem Content-Type
      });
      if (!res.ok) throw new Error(await res.text());
      setRecords((prev) => prev.filter((r) => r._id !== id));
    },
    [module, user?.token]
  );

  const grouped = groupByType(records);
  const grandTotal = records.reduce((sum, r) => sum + r.value, 0);

  return {
    records,
    grouped,
    grandTotal,
    types,
    loading,
    error,
    create,
    update,
    remove,
    refetch: fetchRecords,
  };
}