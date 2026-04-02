import type { Subscription } from "types/subscription";


type Props = {
  subscription: Subscription;
};

export function SubscriptionCard({ subscription }: Props) {
  const { personalData, healthData, paymentData, status } = subscription;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">

      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">{personalData.name}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
          status.subscriptionStatus === "active"
            ? "bg-green-100 text-green-700"
            : status.subscriptionStatus === "cancelled"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}>
          {status.subscriptionStatus}
        </span>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p><span className="font-medium">Idade:</span> {personalData.age}</p>
        <p><span className="font-medium">Cidade:</span> {personalData.city}</p>
        <p><span className="font-medium">Centro Espírita:</span> {personalData.centroEspirita}</p>
        <p><span className="font-medium">Telefone:</span> {personalData.phoneNumber}</p>
        {healthData.restricaoAlimentar && (
          <p><span className="font-medium">Restrição Alimentar:</span> {healthData.restricaoAlimentar}</p>
        )}
        {healthData.restricaoMedica && (
          <p><span className="font-medium">Restrição Médica:</span> {healthData.restricaoMedica}</p>
        )}
      </div>

      <div className="border-t pt-2 text-sm text-gray-600 flex justify-between">
        <span><span className="font-medium">Pagamento:</span> {paymentData.paymentStatus}</span>
        <span>R$ {paymentData.paidValue} / {paymentData.fullValue}</span>
      </div>

    </div>
  );
}