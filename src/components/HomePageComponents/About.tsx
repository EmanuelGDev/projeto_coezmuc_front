import { Lightbulb, Award, Shuffle, BadgeAlert } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Shuffle,
      title: "2026 — Mediunidade Com Jesus",
      description: "Reflexões sobre a mediunidade à luz dos ensinamentos de Jesus e da prática cristã.",
    },
    {
      icon: Lightbulb,
      title: "2025 — As Bem-Aventuranças",
      description: "Um estudo profundo sobre as bem-aventuranças e seus ensinamentos para a vida cotidiana.",
    },
    {
      icon: Award,
      title: "2024 — No Caminho da Regeneração",
      description: "Debates e aprendizados sobre a transformação moral e espiritual da humanidade.",
    },
    {
      icon: BadgeAlert,
      title: "2023 — Conflitos Existenciais",
      description: "Reflexões sobre os desafios da vida, o autoconhecimento e o equilíbrio espiritual.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-sans tracking-[0.2em] uppercase text-[#B07D4A] bg-[#F0E6D3] px-4 py-1.5 rounded-full mb-5">
            Sobre o Evento
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3D2C1E] mb-6 leading-tight">
            O Que É a COEZMUC?
          </h2>
          <p className="text-[#6B5240] text-lg leading-relaxed max-w-3xl mx-auto font-sans">
            O COEZMUC é um evento anual de confraternização espírita que reúne pessoas de todas as idades
            para estudar, refletir e compartilhar experiências sobre os ensinamentos de Jesus e a prática
            do espiritismo. Cada edição aborda questões relevantes para nossa jornada espiritual e crescimento moral.
          </p>
        </div>

        {/* Temas anteriores */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-[#E8DDD0]" />
            <p className="text-xs font-sans tracking-[0.2em] uppercase text-[#B07D4A]">Últimos Temas</p>
            <div className="h-px flex-1 bg-[#E8DDD0]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex gap-5 p-6 rounded-xl border border-[#E8DDD0] bg-white hover:border-[#B07D4A] hover:shadow-sm transition-all duration-300 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 bg-[#F5EDE0] rounded-lg flex items-center justify-center group-hover:bg-[#B07D4A] transition-colors duration-300">
                    <feature.icon className="w-5 h-5 text-[#B07D4A] group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#3D2C1E] mb-1.5 leading-snug">{feature.title}</h3>
                  <p className="text-[#8C7355] text-sm leading-relaxed font-sans">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Imersão */}
        <div className="bg-[#3D2C1E] rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-12 flex flex-col justify-center">
              <span className="inline-block text-xs font-sans tracking-[0.2em] uppercase text-[#D4A96A] mb-5">
                A Experiência
              </span>
              <h3 className="font-serif text-3xl text-[#FAF7F2] mb-5 leading-tight">
                Cinco Dias de Imersão Total
              </h3>
              <p className="text-[#C4B49A] text-sm leading-relaxed font-sans mb-4">
                Durante cinco dias intensos, você participará de palestras inspiradoras, painéis de discussão
                e atividades interativas que enriquecerão seu conhecimento e fortalecerão sua conexão com a
                comunidade espírita.
              </p>
              <p className="text-[#C4B49A] text-sm leading-relaxed font-sans">
                Junte-se a nós para uma jornada de aprendizado, crescimento espiritual e confraternização com
                pessoas que compartilham dos mesmos ideais.
              </p>
            </div>
            <div className="relative h-64 md:h-auto min-h-[280px]">
              <img
                src="https://images.unsplash.com/photo-1474314881477-04c4aac40a0e?w=500&auto=format&fit=crop&q=60"
                alt="Evento COEZMUC"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#3D2C1E]/50" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}