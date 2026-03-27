

interface PersonalData {
  name: string;
  age: number;
  phoneNumber: string;
  city: string;
  centroEspirita: string;
  badgeName: string;
  emergencyContact: string;
}

interface HealthData {
  restricaoAlimentar: string;
  restricaoMedica: string;
  cuidadosEspeciais: string;
}

interface PaymentData {
  fullValue: number;
  paidValue: number;
  paymentStatus: string;
}

interface Status {
  subscriptionStatus: string;
}

interface User {
  _id: string;
  username: string;
}

interface Subscription {
  _id: string;
  personalData: PersonalData;
  healthData: HealthData;
  paymentData: PaymentData;
  status: Status;
  userId: User;
  createdAt: string;
}

interface Props {
  subscription: Subscription | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscriptionModal({
  subscription,
  isOpen,
  onClose
}: Props) {
  if (!isOpen || !subscription) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] shadow-lg relative">
        
        <h2 className="text-2xl font-bold mb-4">
          Detalhes da Inscrição
        </h2>

        {/* Dados pessoais */}
        <p><strong>Nome:</strong> {subscription.personalData.name}</p>
        <p><strong>Idade:</strong> {subscription.personalData.age}</p>
        <p><strong>Cidade:</strong> {subscription.personalData.city}</p>
        <p><strong>Telefone:</strong> {subscription.personalData.phoneNumber}</p>
        <p><strong>Centro Espírita:</strong> {subscription.personalData.centroEspirita}</p>
        <p><strong>Nome no crachá:</strong> {subscription.personalData.badgeName}</p>
        <p><strong>Contato de emergência:</strong> {subscription.personalData.emergencyContact}</p>

        <hr className="my-3"/>

        {/* Saúde */}
        <p><strong>Restrição Alimentar:</strong> {subscription.healthData.restricaoAlimentar}</p>
        <p><strong>Restrição Médica:</strong> {subscription.healthData.restricaoMedica}</p>
        <p><strong>Cuidados Especiais:</strong> {subscription.healthData.cuidadosEspeciais}</p>

        <hr className="my-3"/>

        {/* Pagamento */}
        <p>
          <strong>Pagamento:</strong> R$ {subscription.paymentData.paidValue} / {subscription.paymentData.fullValue}
        </p>
        <p>
          <strong>Status Pagamento:</strong> {subscription.paymentData.paymentStatus}
        </p>
        <p>
          <strong>Status Inscrição:</strong> {subscription.status.subscriptionStatus}
        </p>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}