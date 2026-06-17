import type { FilterState, SortKey, StatusFilter, PaymentFilter } from "@/hooks/useSubscriptionFilters";

interface FilterBarProps {
  filters: FilterState;
  onFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  isFiltered: boolean;
  totalResult: number;
  totalAll: number;
}

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "name_asc", label: "Nome A → Z" },
  { value: "name_desc", label: "Nome Z → A" },
  { value: "date_newest", label: "Mais recentes" },
  { value: "date_oldest", label: "Mais antigas" },
  { value: "age_asc", label: "Idade ↑" },
  { value: "age_desc", label: "Idade ↓" },
  { value: "payment_asc", label: "Valor pago ↑" },
  { value: "payment_desc", label: "Valor pago ↓" },
];

const STATUS_OPTIONS: { value: StatusFilter; label: string; dot: string }[] = [
  { value: "all", label: "Todos os status", dot: "bg-[#C4B49A]" },
  { value: "active", label: "Ativo", dot: "bg-[#4CAF50]" },
  { value: "pending", label: "Pendente", dot: "bg-[#F59E0B]" },
  { value: "cancelled", label: "Cancelado", dot: "bg-[#EF4444]" },
];

const PAYMENT_OPTIONS: { value: PaymentFilter; label: string }[] = [
  { value: "all", label: "Todos os pagamentos" },
  { value: "paid", label: "Pago" },
  { value: "partial", label: "Parcial" },
  { value: "pending", label: "Pendente" },
];

const selectClass =
  "appearance-none w-full pl-3 pr-8 py-2.5 border border-[#E8DDD0] rounded-lg bg-white text-sm text-[#3D2C1E] font-sans focus:outline-none focus:border-[#B07D4A] transition-colors cursor-pointer";

export default function FilterBar({
  filters,
  onFilter,
  onReset,
  isFiltered,
  totalResult,
  totalAll,
}: FilterBarProps) {
  return (
    <div className="max-w-7xl mx-auto mb-6">
      <div className="bg-white border border-[#E8DDD0] rounded-2xl p-4">
        <div className="flex flex-wrap items-end gap-3">

          {/* Busca */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-sans tracking-widest uppercase text-[#8C7355] mb-1.5">
              Buscar
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B07D4A] pointer-events-none"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              <input
                type="text"
                placeholder="Nome, cidade, centro..."
                value={filters.search}
                onChange={(e) => onFilter("search", e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-[#E8DDD0] rounded-lg bg-white text-sm text-[#3D2C1E] font-sans placeholder:text-[#C4B49A] focus:outline-none focus:border-[#B07D4A] transition-colors"
              />
              {filters.search && (
                <button
                  onClick={() => onFilter("search", "")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#C4B49A] hover:text-[#8C7355] transition-colors"
                  aria-label="Limpar busca"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Ordenar */}
          <div className="min-w-[180px]">
            <label className="block text-[10px] font-sans tracking-widest uppercase text-[#8C7355] mb-1.5">
              Ordenar por
            </label>
            <div className="relative">
              <select
                value={filters.sort}
                onChange={(e) => onFilter("sort", e.target.value as SortKey)}
                className={selectClass}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B07D4A]"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Status */}
          <div className="min-w-[180px]">
            <label className="block text-[10px] font-sans tracking-widest uppercase text-[#8C7355] mb-1.5">
              Status
            </label>
            <div className="relative">
              <select
                value={filters.status}
                onChange={(e) => onFilter("status", e.target.value as StatusFilter)}
                className={selectClass}
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B07D4A]"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Pagamento */}
          <div className="min-w-[180px]">
            <label className="block text-[10px] font-sans tracking-widest uppercase text-[#8C7355] mb-1.5">
              Pagamento
            </label>
            <div className="relative">
              <select
                value={filters.payment}
                onChange={(e) => onFilter("payment", e.target.value as PaymentFilter)}
                className={selectClass}
              >
                {PAYMENT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B07D4A]"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Reset + resultado */}
          <div className="flex items-end gap-3 ml-auto">
            {isFiltered && (
              <>
                <span className="text-xs text-[#8C7355] font-sans self-center">
                  {totalResult} de {totalAll}
                </span>
                <button
                  onClick={onReset}
                  className="flex items-center gap-1.5 px-3 py-2.5 border border-[#E8DDD0] rounded-lg text-xs font-sans text-[#8C7355] hover:bg-[#F0E6D3] hover:border-[#B07D4A] transition-colors whitespace-nowrap"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M4 4v5h.582M20 20v-5h-.581M4.582 9a8 8 0 0115.835 2M19.418 15a8 8 0 01-15.835-2" />
                  </svg>
                  Limpar filtros
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}