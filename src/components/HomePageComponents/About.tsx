import { Lightbulb, Award, Shuffle, BadgeAlert } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Shuffle,
      title: "2026 - Mediunidade Com Jesus",
      description: "Reflexões sobre a mediunidade à luz dos ensinamentos de Jesus e da prática cristã."
    },
    {
      icon: Lightbulb,
      title: "2025 - As Bem Aventuranças",
      description: "Um estudo profundo sobre as bem-aventuranças e seus ensinamentos para a vida cotidiana."
    },
    {
      icon: Award,
      title: "2024 - No Caminho da Regeneração",
      description: "Debates e aprendizados sobre a transformação moral e espiritual da humanidade."
    },
    {
      icon: BadgeAlert,
      title: "2023 - Conflitos Existenciais",
      description: "Reflexões sobre os desafios da vida, o autoconhecimento e o equilíbrio espiritual."
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            O Que É o Evento?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            O COEZMUC é um evento anual de confraternização espírita que reúne pessoas de todas as idades para estudar, 
            refletir e compartilhar experiências sobre os ensinamentos de Jesus e a prática do espiritismo. 
            Cada edição tem um tema específico, abordando questões relevantes para a nossa jornada espiritual e o 
            nosso crescimento moral. Venha fazer parte dessa experiência transformadora!
          </p>
        </div>
        <div className="flex items-center justify-center">
            <p className="text-xl font-semibold mb-2 text-gray-900">Ultimos Temas</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex gap-4 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">
                Cinco Dias de Imersão Total
              </h3>
              <p className="text-gray-700 mb-4">
                Durante cinco dias intensos, você terá a oportunidade de participar de palestras inspiradoras,
                atividades práticos, painéis de discussão e atividades interativas que vão enriquecer seu conhecimento
                e fortalecer sua conexão com a comunidade espírita. Cada dia é cuidadosamente planejado para oferecer uma experiência única e transformadora.
              </p>
              <p className="text-gray-700">
                Junte-se a nós para uma jornada de aprendizado, crescimento espiritual e confraternização com pessoas 
                que compartilham dos mesmos ideais.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1474314881477-04c4aac40a0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29uZnJhdGVybml6YSVDMyVBNyVDMyVBM298ZW58MHx8MHx8fDA%3D"
                alt="Evento"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
