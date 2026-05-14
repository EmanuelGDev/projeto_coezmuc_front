import { useState } from "react";

import Header from "@/components/Header";
import { useFinance, type FinanceModule, type FinanceRecord } from "@/hooks/useFinance";

// ─── Formatação ───────────────────────────────────────────────────

const fmt = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR");

// ─── Tokens visuais (espelham o AdminPage) ────────────────────────

const T = {
  bg: "bg-[#FAF7F2]",
  card: "bg-white border border-[#E8DDD0]",
  cardHover: "hover:bg-[#FAF7F2]",
  title: "font-serif text-[#3D2C1E]",
  label: "font-sans text-[#8C7355]",
  muted: "font-sans text-[#8C7355]",
  body: "font-sans text-[#6B5240]",
  border: "border-[#E8DDD0]",
  divider: "border-[#F0E6D3]",
  pill: "bg-[#F0E6D3] text-[#B07D4A]",
  // botão escuro (igual ao "Ver mais" / "Financeiro" do AdminPage)
  btnDark: "bg-[#3D2C1E] text-[#FAF7F2] hover:bg-[#B07D4A] transition-colors",
  // botão outline (cancelar, paginação)
  btnOutline: "border border-[#E8DDD0] text-[#8C7355] hover:bg-[#F0E6D3] transition-colors",
  input: "border border-[#E8DDD0] bg-white text-[#3D2C1E] font-sans placeholder:text-[#C4B49A] focus:outline-none focus:border-[#B07D4A] transition-colors",
} as const;

// ─── Cores de acento por módulo ───────────────────────────────────
// Receita → verde (igual ao status "Ativo" do AdminPage)
// Despesa → vermelho (igual ao status "Cancelado")

function moduleAccent(module: FinanceModule) {
  const isRev = module === "revenue";
  return {
    // tab ativa
    tabActive: isRev
      ? "border border-[#4CAF50] bg-[#E8F5E9] text-[#2E7D32]"
      : "border border-[#EF4444] bg-[#FDECEA] text-[#991B1B]",
    // texto de valor
    valueText: isRev ? "text-[#2E7D32]" : "text-[#991B1B]",
    // card de tipo selecionado
    typeCardActive: isRev
      ? "border-[#4CAF50] bg-[#E8F5E9]"
      : "border-[#EF4444] bg-[#FDECEA]",
    // botão primário do modal
    btnSave: isRev
      ? "bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
      : "bg-[#991B1B] hover:bg-[#7F1D1D] text-white",
    // badge do painel de detalhes
    badge: isRev
      ? "bg-[#E8F5E9] text-[#2E7D32]"
      : "bg-[#FDECEA] text-[#991B1B]",
  };
}

// ─── Modal de criação / edição ────────────────────────────────────

type RecordModalProps = {
  module: FinanceModule;
  types: string[];
  initial?: FinanceRecord;
  defaultType?: string;
  onSave: (data: Omit<FinanceRecord, "_id">) => Promise<void>;
  onClose: () => void;
};

function RecordModal({ module, types, initial, defaultType = "", onSave, onClose }: RecordModalProps) {
  const [type, setType] = useState(initial?.type ?? defaultType);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [value, setValue] = useState(initial?.value?.toString() ?? "");
  const [date, setDate] = useState(
    initial?.date ? initial.date.split("T")[0] : new Date().toISOString().split("T")[0]
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const acc = moduleAccent(module);
  const moduleLabel = module === "revenue" ? "receita" : "despesa";

  async function handleSubmit() {
    if (!type || !description || !value) {
      setErr("Preencha todos os campos obrigatórios.");
      return;
    }
    setSaving(true);
    setErr("");
    try {
      await onSave({ type, description, value: parseFloat(value), date: new Date(date).toISOString() });
      onClose();
    } catch (e: any) {
      setErr(e.message ?? "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  const inputCls = `w-full rounded-lg px-3 py-2.5 text-sm ${T.input}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#E8DDD0] bg-white p-6">

        {/* Cabeçalho */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <span className={`inline-block text-xs font-sans tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-2 ${T.pill}`}>
              {initial ? "Editar" : "Novo"} registro
            </span>
            <h2 className={`font-serif text-xl ${T.title}`}>
              {initial ? `Editar ${moduleLabel}` : `Nova ${moduleLabel}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`mt-1 flex h-7 w-7 items-center justify-center rounded-lg text-sm ${T.btnOutline}`}
          >
            ✕
          </button>
        </div>

        {/* Tipo */}
        <div className="mb-3 flex flex-col gap-1.5">
          <label className={`text-xs tracking-widest uppercase ${T.label}`}>Tipo *</label>
          {types.length > 0 ? (
            <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
              <option value="">Selecione…</option>
              {types.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          ) : (
            <input value={type} onChange={(e) => setType(e.target.value)} className={inputCls} placeholder="Tipo" />
          )}
        </div>

        {/* Descrição */}
        <div className="mb-3 flex flex-col gap-1.5">
          <label className={`text-xs tracking-widest uppercase ${T.label}`}>Descrição *</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputCls}
            placeholder="Descrição do registro"
          />
        </div>

        {/* Valor + Data */}
        <div className="mb-3 grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className={`text-xs tracking-widest uppercase ${T.label}`}>Valor *</label>
            <input
              type="number" min="0" step="0.01"
              value={value} onChange={(e) => setValue(e.target.value)}
              className={inputCls} placeholder="0,00"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={`text-xs tracking-widest uppercase ${T.label}`}>Data</label>
            <input
              type="date" value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        {err && <p className="mb-3 text-xs font-sans text-[#991B1B]">{err}</p>}

        {/* Ações */}
        <div className="flex justify-end gap-2 pt-1">
          <button onClick={onClose} className={`rounded-lg px-4 py-2 text-xs font-sans tracking-wider uppercase ${T.btnOutline}`}>
            Cancelar
          </button>
          <button
            onClick={handleSubmit} disabled={saving}
            className={`rounded-lg px-4 py-2 text-xs font-sans tracking-wider uppercase transition-colors disabled:opacity-60 ${acc.btnSave}`}
          >
            {saving ? "Salvando…" : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Painel de registros de um tipo ───────────────────────────────

type DetailPanelProps = {
  module: FinanceModule;
  typeName: string;
  records: FinanceRecord[];
  types: string[];
  onUpdate: (id: string, data: Partial<FinanceRecord>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onCreate: (data: Omit<FinanceRecord, "_id">) => Promise<void>;
};

function DetailPanel({ module, typeName, records, types, onUpdate, onDelete, onCreate }: DetailPanelProps) {
  const [editing, setEditing] = useState<FinanceRecord | null>(null);
  const [creating, setCreating] = useState(false);
  const acc = moduleAccent(module);

  return (
    <div className={`mt-4 overflow-hidden rounded-2xl ${T.card}`}>

      {/* Cabeçalho */}
      <div className={`flex items-center justify-between border-b px-5 py-4 ${T.divider}`}>
        <div className="flex items-center gap-3">
          <span className={`font-serif text-base ${T.title}`}>{typeName}</span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-sans font-medium ${acc.badge}`}>
            {records.length} {records.length === 1 ? "registro" : "registros"}
          </span>
        </div>
        <button
          onClick={() => setCreating(true)}
          className={`px-3 py-1.5 rounded-lg text-xs font-sans tracking-wider uppercase ${T.btnDark}`}
        >
          + Novo
        </button>
      </div>

      {/* Linhas */}
      {records.length === 0 ? (
        <p className={`px-5 py-8 text-sm text-center ${T.muted}`}>
          Nenhum registro neste tipo ainda.
        </p>
      ) : (
        records.map((r, i) => (
          <div
            key={r._id}
            className={`flex items-center gap-3 border-b px-5 py-3 last:border-b-0 transition-colors ${T.divider} ${T.cardHover} ${i % 2 === 0 ? "bg-white" : "bg-[#FDFAF7]"}`}
          >
            <div className="min-w-0 flex-1">
              <p className={`truncate text-sm font-medium font-sans text-[#3D2C1E]`}>{r.description}</p>
              <p className={`text-xs ${T.muted}`}>{fmtDate(r.date)}</p>
            </div>

            <span className={`min-w-[100px] text-right text-sm font-sans font-medium ${acc.valueText}`}>
              {fmt(r.value)}
            </span>

            {/* Registros sintéticos (ex: Inscrições) são somente-leitura */}
            {!r.readonly && (
              <div className="flex gap-1.5">
                <button
                  title="Editar"
                  onClick={() => setEditing(r)}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm ${T.btnOutline}`}
                >
                  ✎
                </button>
                <button
                  title="Excluir"
                  onClick={async () => {
                    if (confirm(`Excluir "${r.description}"?`)) await onDelete(r._id);
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E8DDD0] text-[#991B1B] hover:bg-[#FDECEA] transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        ))
      )}

      {creating && (
        <RecordModal module={module} types={types} defaultType={typeName} onSave={onCreate} onClose={() => setCreating(false)} />
      )}
      {editing && (
        <RecordModal module={module} types={types} initial={editing} onSave={(data) => onUpdate(editing._id, data)} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}

// ─── Seção de um módulo ───────────────────────────────────────────

function FinanceSection({ module }: { module: FinanceModule }) {
  const { grouped, grandTotal, types, loading, error, create, update, remove } = useFinance(module);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const acc = moduleAccent(module);
  const selectedSummary = grouped.find((g) => g.type === selectedType);
  const totalRecords = grouped.reduce((s, g) => s + g.records.length, 0);

  if (loading)
    return (
      <div className="flex justify-center py-16">
        <p className={`font-serif text-lg tracking-wide animate-pulse ${T.muted}`}>Carregando…</p>
      </div>
    );

  if (error)
    return <p className="py-8 text-sm font-sans text-[#991B1B]">Erro: {error}</p>;

  return (
    <div>
      {/* Cards de métricas — idênticos ao stats row do AdminPage */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        {[
          { label: "Total geral", value: fmt(grandTotal), cls: acc.valueText },
          { label: "Tipos", value: String(grouped.length), cls: "text-[#3D2C1E]" },
          { label: "Registros", value: String(totalRecords), cls: "text-[#3D2C1E]" },
        ].map(({ label, value, cls }) => (
          <div key={label} className={`rounded-xl p-4 ${T.card}`}>
            <p className={`text-xs font-sans tracking-widest uppercase mb-1 ${T.muted}`}>{label}</p>
            <p className={`font-serif text-3xl ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Label instrucional */}
      <p className={`mb-3 text-xs font-sans tracking-[0.2em] uppercase ${T.muted}`}>
        Por tipo — clique para ver registros
      </p>

      {/* Grid de cards por tipo */}
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {grouped.map((g) => {
          const active = selectedType === g.type;
          return (
            <button
              key={g.type}
              onClick={() => setSelectedType(active ? null : g.type)}
              className={[
                "rounded-xl border p-4 text-left transition-colors",
                active
                  ? acc.typeCardActive
                  : `border-[#E8DDD0] bg-white ${T.cardHover}`,
              ].join(" ")}
            >
              <p className={`mb-1 text-sm font-sans font-medium text-[#3D2C1E]`}>{g.type}</p>
              <p className={`mb-2 text-xs ${T.muted}`}>
                {g.records.length} {g.records.length === 1 ? "registro" : "registros"}
              </p>
              <p className={`font-serif text-xl ${acc.valueText}`}>{fmt(g.total)}</p>
            </button>
          );
        })}
      </div>

      {/* Painel de detalhes */}
      {selectedSummary && (
        <DetailPanel
          module={module}
          typeName={selectedSummary.type}
          records={selectedSummary.records}
          types={types}
          onUpdate={update}
          onDelete={remove}
          onCreate={create}
        />
      )}
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────

export default function FinancePage() {
  const [tab, setTab] = useState<FinanceModule>("revenue");
  const [creatingGlobal, setCreatingGlobal] = useState(false);

  const { create, types } = useFinance(tab);
  const label = tab === "revenue" ? "Receita" : "Despesa";

  return (
    <>
      <Header />
      <div className={`min-h-screen ${T.bg} px-4 py-10 md:px-8`}>
        <div className="max-w-5xl mx-auto">

          {/* Page header — mesmo padrão do AdminPage */}
          <div className="mb-8">
            <span className={`inline-block text-xs font-sans tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-3 ${T.pill}`}>
              Painel Administrativo
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className={`font-serif text-3xl md:text-4xl ${T.title}`}>Financeiro</h1>
                <p className={`text-sm mt-1 ${T.muted}`}>
                  Gerencie receitas e despesas por categoria
                </p>
              </div>
              <button
                onClick={() => setCreatingGlobal(true)}
                className={`px-4 py-2 text-xs font-sans tracking-wider uppercase rounded-lg ${T.btnDark}`}
              >
                + Nova {label}
              </button>
            </div>
          </div>

          {/* Tabs — mesma estética dos filtros/badges do AdminPage */}
          <div className="mb-8 flex gap-2">
            {(["revenue", "expense"] as FinanceModule[]).map((m) => {
              const active = tab === m;
              const tabAcc = moduleAccent(m);
              return (
                <button
                  key={m}
                  onClick={() => setTab(m)}
                  className={[
                    "rounded-lg px-5 py-2 text-xs font-sans tracking-wider uppercase transition-colors",
                    active ? tabAcc.tabActive : `border ${T.border} bg-white ${T.muted} ${T.cardHover}`,
                  ].join(" ")}
                >
                  {m === "revenue" ? "Receitas" : "Despesas"}
                </button>
              );
            })}
          </div>

          {/* Seção ativa */}
          <FinanceSection key={tab} module={tab} />

        </div>
      </div>

      {/* Modal global */}
      {creatingGlobal && (
        <RecordModal
          module={tab}
          types={types}
          onSave={create}
          onClose={() => setCreatingGlobal(false)}
        />
      )}
    </>
  );
}