import { useMemo, useState } from "react";
import type { Subscription } from "../../types/subscription";


export type SortKey =
  | "name_asc"
  | "name_desc"
  | "date_newest"
  | "date_oldest"
  | "age_asc"
  | "age_desc"
  | "payment_asc"
  | "payment_desc";

export type StatusFilter = "all" | "active" | "pending" | "cancelled";
export type PaymentFilter = "all" | "paid" | "partial" | "pending";

export interface FilterState {
  search: string;
  sort: SortKey;
  status: StatusFilter;
  payment: PaymentFilter;
}

const DEFAULT_FILTERS: FilterState = {
  search: "",
  sort: "name_asc",
  status: "all",
  payment: "all",
};

export function useSubscriptionFilters(subscriptions: Subscription[]) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  function updateFilter<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }

  const isFiltered =
    filters.search !== "" ||
    filters.sort !== "name_asc" ||
    filters.status !== "all" ||
    filters.payment !== "all";

  const processed = useMemo(() => {
    let result = [...subscriptions];

    // ── Busca textual ──────────────────────────────────────────────
    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      result = result.filter((s) =>
        [s.personalData.name, s.personalData.city, s.personalData.centroEspirita]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    // ── Filtro por status ──────────────────────────────────────────
    if (filters.status !== "all") {
      result = result.filter(
        (s) => s.status.subscriptionStatus === filters.status
      );
    }

    // ── Filtro por pagamento ───────────────────────────────────────
    if (filters.payment !== "all") {
      result = result.filter(
        (s) => s.paymentData.paymentStatus === filters.payment
      );
    }

    // ── Ordenação ──────────────────────────────────────────────────
    result.sort((a, b) => {
      switch (filters.sort) {
        case "name_asc":
          return a.personalData.name.localeCompare(b.personalData.name, "pt");
        case "name_desc":
          return b.personalData.name.localeCompare(a.personalData.name, "pt");
        case "date_newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "date_oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "age_asc":
          return a.personalData.age - b.personalData.age;
        case "age_desc":
          return b.personalData.age - a.personalData.age;
        case "payment_asc":
          return a.paymentData.paidValue - b.paymentData.paidValue;
        case "payment_desc":
          return b.paymentData.paidValue - a.paymentData.paidValue;
        default:
          return 0;
      }
    });

    return result;
  }, [subscriptions, filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    isFiltered,
    processed,
    page,
    setPage,
  };
}