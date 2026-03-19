import { TriangleAlert } from "lucide-react";
import { useAuth } from "@/contexts/Context";
import { useNavigate } from "react-router-dom";

export default function CtaSection() {

  const navigate = useNavigate()
  const {user} = useAuth()
  const warnings = [
    "As incrições são sujeitas a aprovação da coordenação",
    "A coordenação não realiza cobrança do valor da inscrição",
    "Não serão feitas inscrições no lugar do evento",
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Não Perca Esta Oportunidade!
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-4">
            As vagas são limitadas. Garanta já a sua inscrição
          </p>
          <p className="text-lg text-blue-200">
            Inscrições até dia 31 de Dezembro de 2026
          </p>
        </div>

        <div className=" flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-8 ">
          <div className="flex items-center  justify-center p-6">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">Lembre-se:</h3>
              <ul className="space-y-3">
                {warnings.map((warning, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                      <TriangleAlert className="w-4 h-4 text-yellow-900" />
                    </div>
                    <span className="text-lg">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button className=" cursor-pointer px-20 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-700 hover:text-white transition "
            onClick={() => navigate(user ? '/subscription' : '/auth/login')}>
            Inscreva-se
          </button>
        </div>

        <div className="text-center">
          <p className="text-lg text-blue-100 mb-4">
            Acesse o <a 
            href="https://drive.google.com/file/d/17nxvRTpklBFdhWaLdsEOYKK_5svuf0l_/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white tex-bold underline">
                regulamento
            </a> completo e tire suas dúvidas sobre o processo de inscrição. Para mais informações, entre em contato conosco:
          </p>
          <a href="mailto:contato@techsummit.com" className="text-xl font-semibold hover:underline">
            coezmuc123@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
