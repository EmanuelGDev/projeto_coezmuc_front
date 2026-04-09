import { useAuth } from "@/contexts/Context";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1592818868295-f527dbac420d?q=80&w=1170&auto=format&fit=crop')`,
        }}
      >
        {/* Warm dark overlay — substitui o genérico preto/roxo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F07]/80 via-[#2A1A0D]/70 to-[#1A0F07]/90" />
      </div>

      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B07D4A] to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-block mb-6">
          <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#D4A96A] border border-[#B07D4A]/50 px-5 py-2 rounded-full">
            Confraternização Espírita da Zona do Mucuri
          </span>
        </div>

        <h1 className="font-serif text-6xl md:text-8xl text-[#FAF7F2] mb-4 leading-none tracking-tight">
          COEZMUC
        </h1>
        <p className="font-serif text-2xl md:text-3xl text-[#D4A96A] mb-8 italic">
          2027
        </p>

        <p className="text-base md:text-lg text-[#C4B49A] max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          Inscreva-se e venha estudar conosco sobre como podemos seguir
          <span className="text-[#D4A96A] font-medium"> Pelos Caminhos de Jesus</span>
        </p>

        {/* Meta info */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
          <div className="flex items-center gap-2.5 text-[#C4B49A] text-sm font-sans">
            <span className="w-1 h-1 rounded-full bg-[#B07D4A] inline-block" />
            06–10 de Fevereiro, 2027
          </div>
          <div className="hidden sm:block w-px h-4 bg-[#B07D4A]/40" />
          <div className="flex items-center gap-2.5 text-[#C4B49A] text-sm font-sans">
            <span className="w-1 h-1 rounded-full bg-[#B07D4A] inline-block" />
            Escola Waldemar Rocha Neves, Teófilo Otoni
          </div>
        </div>

        <button
          onClick={() => navigate(user ? "/subscription" : "/auth/login")}
          className="
            inline-block px-12 py-4
            bg-[#B07D4A] text-[#FAF7F2]
            font-sans text-xs tracking-[0.2em] uppercase
            rounded-lg
            hover:bg-[#C49060]
            active:scale-[0.98]
            transition-all duration-300
          "
        >
          Inscreva-se
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-9 border border-[#B07D4A]/60 rounded-full flex justify-center pt-1.5">
          <div className="w-0.5 h-2.5 bg-[#B07D4A] rounded-full" />
        </div>
      </div>
    </section>
  );
}