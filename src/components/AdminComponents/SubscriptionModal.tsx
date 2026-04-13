import { useState } from "react";
import { useAuth } from "@/contexts/Context";
import type { HealthData, PaymentData, PersonalData, Subscription } from "../../../types/subscription";

interface Props {
  subscription: Subscription | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdated?: (updated: Subscription) => void;
}

function InlineField({
  label,
  value,
  onChange,
  type = "text",
  options,
}: {
  label: string;
  value: string | number | boolean;
  onChange: (val: string) => void;
  type?: "text" | "number" | "select" | "boolean";
  options?: string[];
}) {
  const [editing, setEditing] = useState(false);

  const displayValue =
    type === "boolean" ? (value ? "Sim" : "Não") : String(value ?? "");

  if (!editing) {
    return (
      <div className="flex items-start gap-3 py-2 border-b border-[#F0E6D3] last:border-0">
        <span className="text-[#8C7355] text-xs font-sans tracking-wide uppercase min-w-[140px] pt-0.5 shrink-0">
          {label}
        </span>
        <span
          className="text-[#3D2C1E] text-sm font-sans cursor-pointer hover:text-[#B07D4A] hover:bg-[#F5EDE0] px-2 py-0.5 rounded transition-colors flex-1"
          title="Clique para editar"
          onClick={() => setEditing(true)}
        >
          {displayValue || <em className="text-[#C4B49A] not-italic">—</em>}
        </span>
      </div>
    );
  }

  const inputClass = "text-sm border border-[#B07D4A] rounded-lg px-2 py-1 outline-none bg-[#FAF7F2] text-[#3D2C1E] font-sans focus:ring-1 focus:ring-[#B07D4A]";

  return (
    <div className="flex items-start gap-3 py-2 border-b border-[#F0E6D3] last:border-0">
      <span className="text-[#8C7355] text-xs font-sans tracking-wide uppercase min-w-[140px] pt-1.5 shrink-0">
        {label}
      </span>
      {type === "select" && options ? (
        <select
          autoFocus
          className={inputClass}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setEditing(false)}
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : type === "boolean" ? (
        <select
          autoFocus
          className={inputClass}
          value={value ? "true" : "false"}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setEditing(false)}
        >
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      ) : (
        <input
          autoFocus
          type={type}
          className={inputClass + " w-48"}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") setEditing(false);
          }}
        />
      )}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mt-6 mb-3">
      <p className="text-xs font-sans tracking-[0.18em] uppercase text-[#B07D4A]">{title}</p>
      <div className="flex-1 h-px bg-[#E8DDD0]" />
    </div>
  );
}

export default function SubscriptionModal({ subscription, isOpen, onClose, onUpdated }: Props) {
  const { user } = useAuth();
  const [form, setForm] = useState<Subscription | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !subscription) return null;

  const data = form?._id === subscription._id ? form : subscription;

  function setPersonal(key: keyof PersonalData, val: string) {
    setForm((prev) => {
      const base = prev ?? subscription!;
      return {
        ...base,
        personalData: {
          ...base.personalData,
          [key]:
            key === "age"
              ? Number(val)
              : key === "imageConsent" || key === "regulationsConsent"
              ? val === "true"
              : val,
        },
      };
    });
  }

  function setHealth(key: keyof HealthData, val: string) {
    setForm((prev) => {
      const base = prev ?? subscription!;
      return { ...base, healthData: { ...base.healthData, [key]: val } };
    });
  }

  function setPayment(key: keyof PaymentData, val: string) {
    setForm((prev) => {
      const base = prev ?? subscription!;
      return {
        ...base,
        paymentData: {
          ...base.paymentData,
          [key]: key === "paidValue" || key === "fullValue" ? Number(val) : val,
        },
      };
    });
  }

  function setStatus(val: string) {
    setForm((prev) => {
      const base = prev ?? subscription!;
      return {
        ...base,
        status: { ...base.status, subscriptionStatus: val as "pending" | "active" | "cancelled" },
      };
    });
  }

  async function handleSave() {
    const payload = form ?? subscription;
    if (!payload) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch(`http://127.0.0.1:3333/subscription/update/${payload._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          personalData: payload.personalData,
          healthData: payload.healthData,
          paymentData: payload.paymentData,
          status: payload.status,
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error ?? "Erro ao atualizar");
      }
      const result = await response.json();
      setSuccess(true);
      onUpdated?.(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1A0F07]/70 z-50 px-4">
      <div className="bg-[#FAF7F2] rounded-2xl border border-[#E8DDD0] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Modal header */}
        <div className="sticky top-0 bg-[#FAF7F2] border-b border-[#E8DDD0] px-6 py-4 flex items-start justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="font-serif text-xl text-[#3D2C1E]">Detalhes da Inscrição</h2>
            <p className="text-xs text-[#B07D4A] font-sans mt-0.5">Clique em qualquer valor para editar</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#8C7355] hover:bg-[#F0E6D3] hover:text-[#3D2C1E] transition-colors"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="px-6 py-4">

          <SectionHeader title="Dados Pessoais" />
          <InlineField label="Nome" value={data.personalData.name} onChange={(v) => setPersonal("name", v)} />
          <InlineField label="Idade" value={data.personalData.age} onChange={(v) => setPersonal("age", v)} type="number" />
          <InlineField label="Telefone" value={data.personalData.phoneNumber} onChange={(v) => setPersonal("phoneNumber", v)} />
          <InlineField label="Cidade" value={data.personalData.city} onChange={(v) => setPersonal("city", v)} />
          <InlineField label="Centro Espírita" value={data.personalData.centroEspirita} onChange={(v) => setPersonal("centroEspirita", v)} />
          <InlineField label="Nome no Crachá" value={data.personalData.badgeName} onChange={(v) => setPersonal("badgeName", v)} />
          <InlineField label="Endereço" value={data.personalData.address} onChange={(v) => setPersonal("address", v)} />
          <InlineField label="Cont. Emergência" value={data.personalData.emergencyContact ?? ""} onChange={(v) => setPersonal("emergencyContact", v)} />
          <InlineField label="Responsável" value={data.personalData.minorsGuardianName ?? ""} onChange={(v) => setPersonal("minorsGuardianName", v)} />
          <InlineField label="Cons. Imagem" value={data.personalData.imageConsent} onChange={(v) => setPersonal("imageConsent", v)} type="boolean" />
          <InlineField label="Cons. Regulamento" value={data.personalData.regulationsConsent} onChange={(v) => setPersonal("regulationsConsent", v)} type="boolean" />

          <SectionHeader title="Saúde" />
          <InlineField label="Rest. Alimentar" value={data.healthData.restricaoAlimentar} onChange={(v) => setHealth("restricaoAlimentar", v)} />
          <InlineField label="Rest. Médica" value={data.healthData.restricaoMedica} onChange={(v) => setHealth("restricaoMedica", v)} />
          <InlineField label="Cuidados Especiais" value={data.healthData.cuidadosEspeciais} onChange={(v) => setHealth("cuidadosEspeciais", v)} />

          <SectionHeader title="Pagamento" />
          <InlineField label="Valor Total" value={data.paymentData.fullValue} onChange={(v) => setPayment("fullValue", v)} type="number" />
          <InlineField label="Valor Pago" value={data.paymentData.paidValue} onChange={(v) => setPayment("paidValue", v)} type="number" />
          <InlineField
            label="Status Pgto."
            value={data.paymentData.paymentStatus}
            onChange={(v) => setPayment("paymentStatus", v)}
            type="select"
            options={["pending", "partial", "paid"]}
          />

          <SectionHeader title="Inscrição" />
          <InlineField
            label="Status"
            value={data.status.subscriptionStatus}
            onChange={(v) => setStatus(v)}
            type="select"
            options={["pending", "active", "cancelled"]}
          />

          {/* Feedback */}
          {error && (
            <div className="mt-4 px-4 py-3 bg-[#FDECEA] border border-red-200 rounded-lg">
              <p className="text-sm text-[#991B1B] font-sans">{error}</p>
            </div>
          )}
          {success && (
            <div className="mt-4 px-4 py-3 bg-[#E8F5E9] border border-green-200 rounded-lg">
              <p className="text-sm text-[#2E7D32] font-sans">Salvo com sucesso!</p>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="sticky bottom-0 bg-[#FAF7F2] border-t border-[#E8DDD0] px-6 py-4 flex gap-3 rounded-b-2xl">
          <button
            onClick={handleSave}
            disabled={saving || !form}
            className="
              flex-1 py-2.5 bg-[#3D2C1E] text-[#FAF7F2]
              font-sans text-xs tracking-[0.18em] uppercase rounded-lg
              hover:bg-[#B07D4A]
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-200
              flex items-center justify-center gap-2
            "
          >
            {saving && <div className="w-3.5 h-3.5 border-2 border-[#FAF7F2] border-t-transparent rounded-full animate-spin" />}
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-[#E8DDD0] text-[#8C7355] font-sans text-xs tracking-[0.18em] uppercase rounded-lg hover:bg-[#F0E6D3] hover:text-[#3D2C1E] transition-colors duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}