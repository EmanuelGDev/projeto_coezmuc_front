import { TriangleAlert } from "lucide-react";
import { useAuth } from "@/contexts/Context";
import { useNavigate } from "react-router-dom";

export default function CtaSection() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const warnings = [
    "As inscrições são sujeitas à aprovação da coordenação",
    "A coordenação não realiza cobrança do valor da inscrição",
    "Não serão feitas inscrições no lugar do evento",
  ];

  return (
    <section className="py-24 px-6 bg-[#3D2C1E] relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-[#B07D4A] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#D4A96A] blur-3xl" />
      </div>

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B07D4A]/60 to-transparent" />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-sans tracking-[0.2em] uppercase text-[#D4A96A] border border-[#B07D4A]/40 px-4 py-1.5 rounded-full mb-6">
            Inscrições Abertas
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#FAF7F2] mb-4 leading-tight">
            Não Perca Esta Oportunidade
          </h2>
          <p className="text-[#C4B49A] text-lg font-sans mb-2">
            As vagas são limitadas. Garanta já a sua inscrição.
          </p>
          <p className="text-[#8C7355] text-sm font-sans">
            Inscrições até 31 de Dezembro de 2026
          </p>
        </div>

        {/* Avisos */}
        <div className="bg-[#FAF7F2]/5 border border-[#B07D4A]/30 rounded-2xl p-8 md:p-10 mb-8">
          <h3 className="font-serif text-xl text-[#D4A96A] mb-6 text-center">Lembre-se</h3>
          <ul className="space-y-4 mb-8">
            {warnings.map((warning, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#B07D4A]/20 border border-[#B07D4A]/40 rounded-full flex items-center justify-center mt-0.5">
                  <TriangleAlert className="w-3 h-3 text-[#D4A96A]" />
                </div>
                <span className="text-[#C4B49A] text-sm leading-relaxed font-sans">{warning}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-center">
            <button
              onClick={() => navigate(user ? "/subscription" : "/auth/login")}
              className="
                px-16 py-3.5
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
        </div>

        {/* Contact */}
        <div className="text-center">
          <p className="text-[#8C7355] text-sm font-sans mb-3 leading-relaxed">
            Acesse o{" "}
            <a
              href="https://drive.google.com/file/d/17nxvRTpklBFdhWaLdsEOYKK_5svuf0l_/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4A96A] underline underline-offset-2 hover:text-[#FAF7F2] transition-colors"
            >
              regulamento completo
            </a>{" "}
            e tire suas dúvidas sobre o processo de inscrição.
          </p>
          <a
            href="mailto:coezmuc123@gmail.com"
            className="text-[#D4A96A] text-sm font-sans hover:text-[#FAF7F2] transition-colors tracking-wide"
          >
            coezmuc123@gmail.com
          </a>
        </div>

      </div>
    </section>
  );
}