import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/Context";
import Header from "@/components/Header";
import { SubscriptionCard } from "@/components/UserSubscriptionsModal/SubscriptionCard";
import { useUserSubscriptions } from "@/hooks/useUserSubscriptions";

export default function MySubscriptionsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, loading, error } = useUserSubscriptions(user?.id ?? "");

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#FAF7F2] px-4 py-12 md:py-16">

        {/* Hero */}
        <div className="max-w-2xl mx-auto mb-10">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex items-center gap-1.5 text-sm text-[#8C7355] hover:text-[#B07D4A] hover:bg-[#F0E6D3] transition-colors mb-6 font-sans border border-[#E8DDD0] rounded-lg px-3 py-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>

          <div className="inline-block mb-4">
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#B07D4A] bg-[#F0E6D3] px-4 py-1.5 rounded-full">
              Área do Participante
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-[#3D2C1E] leading-tight mb-3">
            Minhas Inscrições
          </h1>
          {!loading && !error && (
            <p className="text-[#8C7355] text-base font-sans">
              {data.length === 0
                ? "Nenhuma inscrição encontrada."
                : `${data.length} ${data.length === 1 ? "inscrição encontrada" : "inscrições encontradas"}`}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-8 h-8 border-[3px] border-[#E8DDD0] border-t-[#B07D4A] rounded-full animate-spin" />
              <p className="text-sm text-[#8C7355] font-sans animate-pulse">Carregando inscrições...</p>
            </div>
          )}

          {/* Erro */}
          {error && !loading && (
            <div className="bg-white border border-[#E8DDD0] rounded-2xl px-8 py-12 text-center space-y-2">
              <p className="text-base font-serif text-[#C0623A]">Erro ao carregar as inscrições.</p>
              <p className="text-sm text-[#8C7355] font-sans">{error.message}</p>
            </div>
          )}

          {/* Vazio */}
          {!loading && !error && data.length === 0 && (
            <div className="bg-white border border-[#E8DDD0] rounded-2xl px-8 py-16 text-center space-y-3">
              <svg className="w-10 h-10 text-[#D4C4B0] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-base font-serif text-[#3D2C1E]">Nenhuma inscrição encontrada.</p>
              <p className="text-sm text-[#8C7355] font-sans">
                Você ainda não realizou nenhuma inscrição.
              </p>
              <button
                onClick={() => navigate('/subscription')}
                className="cursor-pointer mt-2 inline-block bg-[#3D2C1E] text-[#FAF7F2] font-sans text-sm tracking-widest uppercase px-6 py-3 rounded-xl hover:bg-[#B07D4A] transition-all duration-300"
              >
                Fazer Inscrição
              </button>
            </div>
          )}

          {/* Lista */}
          {!loading && !error && data.length > 0 && (
            <div className="flex flex-col gap-4">
              {data.map((sub) => (
                <SubscriptionCard key={sub._id} subscription={sub} />
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}