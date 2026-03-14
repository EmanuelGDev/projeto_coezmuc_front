import { useEffect, useState } from "react";

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

interface ApiResponse {
  data: Subscription[];
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchSubscriptions() {
    try {
      const response = await fetch("http://127.0.0.1:3333/subscription");
      const result: ApiResponse = await response.json();

      setSubscriptions(result.data);
    } catch (error) {
      console.error("Erro ao buscar inscrições:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Carregando inscrições...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Lista de Inscrições</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Idade</th>
              <th className="p-3">Cidade</th>
              <th className="p-3">Telefone</th>
              <th className="p-3">Centro Espírita</th>
              <th className="p-3">Restrição Alimentar</th>
              <th className="p-3">Restrição Médica</th>
              <th className="p-3">Pagamento</th>
              <th className="p-3">Valor</th>
              <th className="p-3">Status</th>
              <th className="p-3">Criado em</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{sub.personalData.name}</td>
                <td className="p-3">{sub.personalData.age}</td>
                <td className="p-3">{sub.personalData.city}</td>
                <td className="p-3">{sub.personalData.phoneNumber}</td>
                <td className="p-3">{sub.personalData.centroEspirita}</td>
                <td className="p-3">{sub.healthData.restricaoAlimentar}</td>
                <td className="p-3">{sub.paymentData.paymentStatus}</td>
                <td className="p-3">
                  R$ {sub.paymentData.paidValue} / {sub.paymentData.fullValue}
                </td>
                <td className="p-3">{sub.status.subscriptionStatus}</td>
                <td className="p-3">
                  {new Date(sub.createdAt).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}