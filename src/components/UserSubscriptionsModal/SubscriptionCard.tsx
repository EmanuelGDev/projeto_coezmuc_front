import React from 'react'
import type { Subscription } from 'types/subscription'


interface Props {
  subscription: Subscription
}

const statusConfig = {
  pending: { label: 'Pendente', className: 'bg-amber-100 text-amber-600' },
  active: { label: 'Ativa', className: 'bg-emerald-100 text-emerald-600' },
  cancelled: { label: 'Cancelada', className: 'bg-red-100 text-red-500' },
}

const paymentConfig = {
  pending: { label: 'Pendente', className: 'text-amber-500' },
  paid: { label: 'Pago', className: 'text-emerald-500' },
  partial: { label: 'Parcial', className: 'text-blue-500' },
}

export function SubscriptionCard({ subscription }: Props) {
  const { personalData, healthData, paymentData, status, createdAt } = subscription

  const subsStatus = status.subscriptionStatus
  const payStatus = paymentData.paymentStatus
  const paidPercent =
    paymentData.fullValue > 0
      ? Math.round((paymentData.paidValue / paymentData.fullValue) * 100)
      : 0

  const statusCfg = statusConfig[subsStatus] ?? { label: subsStatus, className: 'bg-gray-100 text-gray-500' }
  const payCfg = paymentConfig[payStatus] ?? { label: payStatus, className: 'text-gray-500' }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-base font-bold text-gray-900">{personalData.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">Crachá: {personalData.badgeName}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusCfg.className}`}>
          {statusCfg.label}
        </span>
      </div>

      <div className="h-px bg-gray-100 my-3" />

      {/* Dados Pessoais */}
      <Section title="Dados Pessoais">
        <Row label="Idade" value={`${personalData.age} anos`} />
        <Row label="Telefone" value={personalData.phoneNumber} />
        <Row label="Cidade" value={personalData.city} />
        <Row label="Endereço" value={personalData.address} />
        <Row label="Centro Espírita" value={personalData.centroEspirita} />
        <Row label="Contato de emergência" value={personalData.emergencyContact} />
        {personalData.minorsGuardianName && (
          <Row label="Responsável" value={personalData.minorsGuardianName} />
        )}
        <Row label="Consentimento de imagem" value={personalData.imageConsent ? 'Sim' : 'Não'} />
        <Row label="Aceite do regulamento" value={personalData.regulationsConsent ? 'Sim' : 'Não'} />
      </Section>

      <div className="h-px bg-gray-100 my-3" />

      {/* Saúde */}
      <Section title="Saúde">
        <Row label="Restrição alimentar" value={healthData.restricaoAlimentar} />
        <Row label="Restrição médica" value={healthData.restricaoMedica} />
        <Row label="Cuidados especiais" value={healthData.cuidadosEspeciais} />
      </Section>

      <div className="h-px bg-gray-100 my-3" />

      {/* Pagamento */}
      <Section title="Pagamento">
        <Row
          label="Status"
          value={payCfg.label}
          valueClassName={`font-semibold ${payCfg.className}`}
        />
        <Row label="Valor total" value={`R$ ${paymentData.fullValue.toFixed(2)}`} />
        <Row label="Valor pago" value={`R$ ${paymentData.paidValue.toFixed(2)}`} />

        {/* Barra de progresso */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                paidPercent === 100 ? 'bg-emerald-500' : 'bg-amber-400'
              }`}
              style={{ width: `${paidPercent}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">{paidPercent}% pago</span>
        </div>
      </Section>

      <p className="text-xs text-gray-300 text-right mt-4">
        Inscrito em {new Date(createdAt).toLocaleDateString('pt-BR')}
      </p>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{title}</p>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
}

function Row({
  label,
  value,
  valueClassName,
}: {
  label: string
  value: string
  valueClassName?: string
}) {
  return (
    <div className="flex justify-between gap-2 text-xs">
      <span className="text-gray-400 shrink-0">{label}</span>
      <span className={`text-gray-800 text-right ${valueClassName ?? ''}`}>{value}</span>
    </div>
  )
}
