import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/Context"; // ajuste o caminho se necessário

// ----- Types -----

export type FinanceRecord = {
  _id: string;
  type: string;
  description: string;
  date: string;
  value: number;
  // flag interna: o card de Inscrições é somente-leitura (não permite editar/excluir)
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

function authHeaders(token: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Agrupa registros por type e soma os valores de cada grupo
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

  // Busca os registros normais do módulo (revenue ou expense)
  const fetchRecords = useCallback(async () => {
    if (!user?.token) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/${module}`, {
        headers: authHeaders(user.token),
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

  // Busca os tipos válidos para o <select> do formulário
  const fetchTypes = useCallback(async () => {
    if (!user?.token) return;
    try {
      const res = await fetch(`${BASE_URL}/${module}/types`, {
        headers: authHeaders(user.token),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: string[] = await res.json();
      setTypes(data);
    } catch {
      // Não bloqueia a UI
    }
  }, [module, user?.token]);

  // Busca o resumo de paidValue das subscriptions e injeta como registro sintético.
  // Só roda quando o módulo é "revenue" — inscrições são sempre receita.
  const fetchSubscriptionRevenue = useCallback(async () => {
    if (module !== "revenue" || !user?.token) return;

    try {
      const res = await fetch(`${BASE_URL}/subscription/revenue-summary`, {
        headers: authHeaders(user.token),
      });
      if (!res.ok) return; // falha silenciosa — não quebra o resto da página

      const json = await res.json();
      const { total, count } = json.data as { total: number; count: number };

      if (total <= 0) return; // nenhuma subscription com paidValue > 0, não mostra o card

      // Registro sintético: aparece como um único item no card "Inscrições".
      // readonly: true → o DetailPanel vai esconder os botões de editar/excluir.
      const syntheticRecord: FinanceRecord = {
        _id: "synthetic-subscriptions",
        type: "Inscrições",
        description: `${count} inscrição${count !== 1 ? "s" : ""} com pagamento registrado`,
        date: new Date().toISOString(),
        value: total,
        readonly: true,
      };

      // Injeta junto aos registros normais — groupByType vai criar o card automaticamente
      setRecords((prev) => {
        // Remove injeção anterior para evitar duplicatas em re-fetches
        const withoutSynthetic = prev.filter((r) => r._id !== "synthetic-subscriptions");
        return [...withoutSynthetic, syntheticRecord];
      });
    } catch {
      // Falha silenciosa — o card simplesmente não aparece
    }
  }, [module, user?.token]);

  useEffect(() => {
    // fetchRecords e fetchSubscriptionRevenue rodam em paralelo:
    // fetchRecords popula setRecords com os registros reais,
    // fetchSubscriptionRevenue adiciona o registro sintético logo depois.
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
      const created: FinanceRecord = await res.json();
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
      const updated: FinanceRecord = await res.json();
      setRecords((prev) => prev.map((r) => (r._id === id ? updated : r)));
    },
    [module, user?.token]
  );

  const remove = useCallback(
    async (id: string) => {
      if (!user?.token) throw new Error("Não autenticado");

      const res = await fetch(`${BASE_URL}/${module}/delete/${id}`, {
        method: "DELETE",
        headers: authHeaders(user.token),
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