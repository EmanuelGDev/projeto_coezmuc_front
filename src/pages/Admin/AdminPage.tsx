import Header from "@/components/Header";
import { useAuth } from "@/contexts/Context";
import { useEffect, useState } from "react";
import SubscriptionModal from "@/components/AdminComponents/SubscriptionModal";
import type { Subscription } from "../../../types/subscription";
import { useNavigate } from "react-router-dom";

interface ApiResponse {
  data: Subscription[];
}



const PAGE_SIZE = 15;

const statusConfig = {
  active: { label: "Ativo", bg: "bg-[#E8F5E9]", text: "text-[#2E7D32]", dot: "bg-[#4CAF50]" },
  pending: { label: "Pendente", bg: "bg-[#FFF8E1]", text: "text-[#8C6D1F]", dot: "bg-[#F59E0B]" },
  cancelled: { label: "Cancelado", bg: "bg-[#FDECEA]", text: "text-[#991B1B]", dot: "bg-[#EF4444]" },
};

const paymentConfig = {
  paid: { label: "Pago", bg: "bg-[#E8F5E9]", text: "text-[#2E7D32]" },
  partial: { label: "Parcial", bg: "bg-[#FFF8E1]", text: "text-[#8C6D1F]" },
  pending: { label: "Pendente", bg: "bg-[#FDECEA]", text: "text-[#991B1B]" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status as keyof typeof statusConfig] ?? {
    label: status, bg: "bg-[#F5EDE0]", text: "text-[#8C7355]", dot: "bg-[#B07D4A]"
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-sans font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function PaymentBadge({ status }: { status: string }) {
  const cfg = paymentConfig[status as keyof typeof paymentConfig] ?? {
    label: status, bg: "bg-[#F5EDE0]", text: "text-[#8C7355]"
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-sans font-medium ${cfg.bg} ${cfg.text}`}>
      {cfg.label}
    </span>
  );
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  async function fetchSubscriptions() {
    try {
      const response = await fetch("http://127.0.0.1:3333/subscription", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      const result: ApiResponse = await response.json();
      setSubscriptions(result.data);
    } catch (error) {
      console.error("Erro ao buscar inscrições:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchSubscriptions(); }, []);

  async function getSubscription(id: string) {
    try {
      const response = await fetch(`http://127.0.0.1:3333/subscription/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      const result = await response.json();
      setSubscription(result.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar inscrição:", error);
    }
  }

  const filtered = subscriptions.filter((s) =>
    [s.personalData.name, s.personalData.city, s.personalData.centroEspirita]
      .join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // reset page on new search
  function handleSearch(val: string) {
    setSearch(val);
    setPage(1);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <p className="text-[#8C7355] font-serif text-lg tracking-wide animate-pulse">
          Carregando inscrições...
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#FAF7F2] px-4 py-10 md:px-8">

        {/* Page header */}
        <div className="max-w-7xl mx-auto mb-8">
          <span className="inline-block text-xs font-sans tracking-[0.2em] uppercase text-[#B07D4A] bg-[#F0E6D3] px-4 py-1.5 rounded-full mb-3">
            Painel Administrativo
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-[#3D2C1E]">
                Lista de Inscrições
              </h1>
              <p className="text-[#8C7355] text-sm font-sans mt-1">
                {subscriptions.length} inscrição{subscriptions.length !== 1 ? "s" : ""} no total
              </p>
              <button
                onClick={() => navigate("/admin/financeiro")}
                className="px-4 py-2 bg-[#3D2C1E] text-[#FAF7F2] text-xs font-sans tracking-wider uppercase rounded-lg hover:bg-[#B07D4A] transition-colors"
              >
                Financeiro
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B07D4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por nome, cidade..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-[#E8DDD0] rounded-lg bg-white text-sm text-[#3D2C1E] font-sans placeholder:text-[#C4B49A] focus:outline-none focus:border-[#B07D4A] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: subscriptions.length, color: "text-[#3D2C1E]" },
            { label: "Ativos", value: subscriptions.filter(s => s.status.subscriptionStatus === "active").length, color: "text-[#2E7D32]" },
            { label: "Pendentes", value: subscriptions.filter(s => s.status.subscriptionStatus === "pending").length, color: "text-[#8C6D1F]" },
            { label: "Cancelados", value: subscriptions.filter(s => s.status.subscriptionStatus === "cancelled").length, color: "text-[#991B1B]" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white border border-[#E8DDD0] rounded-xl p-4">
              <p className="text-xs font-sans tracking-widest uppercase text-[#8C7355] mb-1">{label}</p>
              <p className={`font-serif text-3xl ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="max-w-7xl mx-auto hidden md:block">
          <div className="bg-white border border-[#E8DDD0] rounded-2xl overflow-hidden">
            <table className="w-full text-left table-fixed">
              <thead>
                <tr className="bg-[#F5EDE0] border-b border-[#E8DDD0]">
                  <th className="px-3 py-3 text-xs font-sans tracking-widest uppercase text-[#8C7355] w-[18%]">Nome</th>
                  <th className="px-3 py-3 text-xs font-sans tracking-widest uppercase text-[#8C7355] w-[7%]">Idade</th>
                  <th className="px-3 py-3 text-xs font-sans tracking-widest uppercase text-[#8C7355] w-[12%]">Cidade</th>
                  <th className="px-3 py-3 text-xs font-sans tracking-widest uppercase text-[#8C7355] w-[12%]">Telefone</th>
                  <th className="px-3 py-3 text-xs font-sans tracking-widest uppercase text-[#8C7355] w-[16%]">Centro</th>
                  <th className="px-3 py-3 text-xs font-sans tracking-widest uppercase text-[#8C7355] w-[13%]">Pagamento</th>
                  <th className="px-3 py-3 text-xs font-sans tracking-widest uppercase text-[#8C7355] w-[10%]">Pgto.</th>
                  <th className="px-3 py-3 text-xs font-sans tracking-widest uppercase text-[#8C7355] w-[10%]">Status</th>
                  <th className="px-3 py-3 text-xs font-sans tracking-widest uppercase text-[#8C7355] w-[9%]">Data</th>
                  <th className="px-3 py-3 w-[9%]" />
                </tr>
              </thead>
              <tbody>
                {paginated.map((sub, i) => (
                  <tr
                    key={sub._id}
                    className={`border-b border-[#F0E6D3] hover:bg-[#FAF7F2] transition-colors ${i % 2 === 0 ? "bg-white" : "bg-[#FDFAF7]"}`}
                  >
                    <td className="px-3 py-3 text-sm font-medium text-[#3D2C1E] font-sans truncate">{sub.personalData.name}</td>
                    <td className="px-3 py-3 text-sm text-[#6B5240] font-sans">{sub.personalData.age}</td>
                    <td className="px-3 py-3 text-sm text-[#6B5240] font-sans truncate">{sub.personalData.city}</td>
                    <td className="px-3 py-3 text-sm text-[#6B5240] font-sans truncate">{sub.personalData.phoneNumber}</td>
                    <td className="px-3 py-3 text-sm text-[#6B5240] font-sans truncate" title={sub.personalData.centroEspirita}>
                      {sub.personalData.centroEspirita}
                    </td>
                    <td className="px-3 py-3 text-sm text-[#6B5240] font-sans truncate">
                      R$ {sub.paymentData.paidValue}/{sub.paymentData.fullValue}
                    </td>
                    <td className="px-3 py-3">
                      <PaymentBadge status={sub.paymentData.paymentStatus} />
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={sub.status.subscriptionStatus} />
                    </td>
                    <td className="px-3 py-3 text-sm text-[#8C7355] font-sans">
                      {new Date(sub.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={() => getSubscription(sub._id)}
                        className="px-2.5 py-1.5 bg-[#3D2C1E] text-[#FAF7F2] text-xs font-sans tracking-wider uppercase rounded-lg hover:bg-[#B07D4A] transition-colors duration-200 whitespace-nowrap"
                      >
                        Ver mais
                      </button>
                    </td>
                  </tr>
                ))}

                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-5 py-16 text-center text-[#8C7355] font-sans text-sm">
                      Nenhuma inscrição encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-[#8C7355] font-sans">
                Mostrando {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} de {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-xs font-sans border border-[#E8DDD0] rounded-lg text-[#8C7355] hover:bg-[#F0E6D3] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 text-xs font-sans rounded-lg border transition-colors ${p === page
                        ? "bg-[#3D2C1E] text-[#FAF7F2] border-[#3D2C1E]"
                        : "border-[#E8DDD0] text-[#8C7355] hover:bg-[#F0E6D3]"
                      }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-xs font-sans border border-[#E8DDD0] rounded-lg text-[#8C7355] hover:bg-[#F0E6D3] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Próxima →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile cards */}
        <div className="max-w-7xl mx-auto md:hidden space-y-4">
          {paginated.map((sub) => (
            <div key={sub._id} className="bg-white border border-[#E8DDD0] rounded-xl p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-serif text-base text-[#3D2C1E] leading-snug">{sub.personalData.name}</p>
                  <p className="text-xs text-[#8C7355] font-sans mt-0.5">{sub.personalData.city} · {sub.personalData.age} anos</p>
                </div>
                <StatusBadge status={sub.status.subscriptionStatus} />
              </div>

              <div className="space-y-1.5 mb-4">
                <p className="text-xs text-[#8C7355] font-sans">{sub.personalData.centroEspirita}</p>
                <p className="text-xs text-[#8C7355] font-sans">{sub.personalData.phoneNumber}</p>
                <div className="flex items-center gap-2 mt-2">
                  <PaymentBadge status={sub.paymentData.paymentStatus} />
                  <span className="text-xs text-[#8C7355] font-sans">
                    R$ {sub.paymentData.paidValue} / {sub.paymentData.fullValue}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#F0E6D3]">
                <span className="text-xs text-[#B0A090] font-sans">
                  {new Date(sub.createdAt).toLocaleDateString("pt-BR")}
                </span>
                <button
                  onClick={() => getSubscription(sub._id)}
                  className="px-4 py-1.5 bg-[#3D2C1E] text-[#FAF7F2] text-xs font-sans tracking-wider uppercase rounded-lg hover:bg-[#B07D4A] transition-colors duration-200"
                >
                  Ver mais
                </button>
              </div>
            </div>
          ))}

          {paginated.length === 0 && (
            <div className="text-center py-16 text-[#8C7355] font-sans text-sm">
              Nenhuma inscrição encontrada.
            </div>
          )}

          {/* Mobile pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-xs font-sans border border-[#E8DDD0] rounded-lg text-[#8C7355] hover:bg-[#F0E6D3] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Anterior
              </button>
              <p className="text-xs text-[#8C7355] font-sans">{page} / {totalPages}</p>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-xs font-sans border border-[#E8DDD0] rounded-lg text-[#8C7355] hover:bg-[#F0E6D3] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Próxima →
              </button>
            </div>
          )}
        </div>

      </div>

      <SubscriptionModal
        subscription={subscription}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdated={(updated) =>
          setSubscriptions((prev) =>
            prev.map((s) => (s._id === updated._id ? updated : s))
          )
        }
      />
    </>
  );
}