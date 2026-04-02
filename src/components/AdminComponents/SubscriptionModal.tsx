import { useState } from "react";
import { useAuth } from "@/contexts/Context";
import type { HealthData, PaymentData, PersonalData, Subscription } from "types/subscription";

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
    type === "boolean" ? (value ? "Sim" : "Não") : String(value ?? "—");

  if (!editing) {
    return (
      <div className="flex items-center gap-2 py-1">
        <span className="text-gray-500 text-sm min-w-[160px]">{label}:</span>
        <span
          className="text-gray-900 text-sm cursor-pointer hover:bg-yellow-100 hover:text-yellow-800 px-1 rounded transition-colors border border-transparent hover:border-yellow-300"
          title="Clique para editar"
          onClick={() => setEditing(true)}
        >
          {displayValue || <em className="text-gray-400">—</em>}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 py-1">
      <span className="text-gray-500 text-sm min-w-[160px]">{label}:</span>
      {type === "select" && options ? (
        <select
          autoFocus
          className="text-sm border border-blue-400 rounded px-1 py-0.5 outline-none"
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
          className="text-sm border border-blue-400 rounded px-1 py-0.5 outline-none"
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
          className="text-sm border border-blue-400 rounded px-1 py-0.5 outline-none w-40"
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
      return {
        ...base,
        healthData: { ...base.healthData, [key]: val },
      };
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-6 w-[560px] max-h-[90vh] overflow-y-auto shadow-xl relative">
        <h2 className="text-2xl font-bold mb-1">Detalhes da Inscrição</h2>
        <p className="text-xs text-gray-400 mb-4">Clique em qualquer valor para editar</p>

        {/* Dados Pessoais */}
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">Dados Pessoais</h3>
        <InlineField label="Nome" value={data.personalData.name} onChange={(v) => setPersonal("name", v)} />
        <InlineField label="Idade" value={data.personalData.age} onChange={(v) => setPersonal("age", v)} type="number" />
        <InlineField label="Telefone" value={data.personalData.phoneNumber} onChange={(v) => setPersonal("phoneNumber", v)} />
        <InlineField label="Cidade" value={data.personalData.city} onChange={(v) => setPersonal("city", v)} />
        <InlineField label="Centro Espírita" value={data.personalData.centroEspirita} onChange={(v) => setPersonal("centroEspirita", v)} />
        <InlineField label="Nome no crachá" value={data.personalData.badgeName} onChange={(v) => setPersonal("badgeName", v)} />
        <InlineField label="Contato de emergência" value={data.personalData.emergencyContact ?? ""} onChange={(v) => setPersonal("emergencyContact", v)} />
        <InlineField label="Responsável (menor)" value={data.personalData.minorsGuardianName ?? ""} onChange={(v) => setPersonal("minorsGuardianName", v)} />
        <InlineField label="Endereço" value={data.personalData.address} onChange={(v) => setPersonal("address", v)} />
        <InlineField label="Consent. Imagem" value={data.personalData.imageConsent} onChange={(v) => setPersonal("imageConsent", v)} type="boolean" />
        <InlineField label="Consent. Regulamento" value={data.personalData.regulationsConsent} onChange={(v) => setPersonal("regulationsConsent", v)} type="boolean" />

        <hr className="my-3" />

        {/* Saúde */}
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">Saúde</h3>
        <InlineField label="Restrição Alimentar" value={data.healthData.restricaoAlimentar} onChange={(v) => setHealth("restricaoAlimentar", v)} />
        <InlineField label="Restrição Médica" value={data.healthData.restricaoMedica} onChange={(v) => setHealth("restricaoMedica", v)} />
        <InlineField label="Cuidados Especiais" value={data.healthData.cuidadosEspeciais} onChange={(v) => setHealth("cuidadosEspeciais", v)} />

        <hr className="my-3" />

        {/* Pagamento */}
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">Pagamento</h3>
        <InlineField label="Valor Total" value={data.paymentData.fullValue} onChange={(v) => setPayment("fullValue", v)} type="number" />
        <InlineField label="Valor Pago" value={data.paymentData.paidValue} onChange={(v) => setPayment("paidValue", v)} type="number" />
        <InlineField
          label="Status Pagamento"
          value={data.paymentData.paymentStatus}
          onChange={(v) => setPayment("paymentStatus", v)}
          type="select"
          options={["pending", "partial", "paid"]}
        />

        <hr className="my-3" />

        {/* Status da Inscrição */}
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">Status da Inscrição</h3>
        <InlineField
          label="Status da Inscrição"
          value={data.status.subscriptionStatus}
          onChange={(v) => setStatus(v)}
          type="select"
          options={["pending", "active", "cancelled"]}
        />

        {/* Feedback */}
        {error && <p className="mt-3 text-sm text-red-600 font-medium">{error}</p>}
        {success && <p className="mt-3 text-sm text-green-600 font-medium">Salvo com sucesso!</p>}

        {/* Ações */}
        <div className="flex gap-2 mt-5">
          <button
            onClick={handleSave}
            disabled={saving || !form}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}