import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/Context";

type Revenue = {
  _id: string;
  type: string;
  description: string;
  value: number;
  date: string;
};

export default function FinancePage() {
  const { user } = useAuth();
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchRevenues() {
    try {
      const response = await fetch("http://127.0.0.1:3333/revenue", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const data = await response.json();
      setRevenues(data);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRevenues();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando financeiro...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#FAF7F2] px-4 py-10 md:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Título */}
          <div className="mb-6">
            <h1 className="text-3xl font-serif text-[#3D2C1E]">
              Financeiro
            </h1>
            <p className="text-sm text-[#8C7355]">
              Lista de receitas cadastradas
            </p>
          </div>

          {/* Tabela */}
          <div className="bg-white border border-[#E8DDD0] rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F5EDE0] border-b border-[#E8DDD0]">
                  <th className="px-4 py-3 text-xs uppercase text-[#8C7355]">Tipo</th>
                  <th className="px-4 py-3 text-xs uppercase text-[#8C7355]">Descrição</th>
                  <th className="px-4 py-3 text-xs uppercase text-[#8C7355]">Valor</th>
                  <th className="px-4 py-3 text-xs uppercase text-[#8C7355]">Data</th>
                </tr>
              </thead>
              <tbody>
                {revenues.map((rev) => (
                  <tr key={rev._id} className="border-b border-[#F0E6D3]">
                    <td className="px-4 py-3 text-sm">{rev.type}</td>
                    <td className="px-4 py-3 text-sm">{rev.description}</td>
                    <td className="px-4 py-3 text-sm">
                      R$ {rev.value.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(rev.date).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))}

                {revenues.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-sm text-[#8C7355]">
                      Nenhuma receita cadastrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}