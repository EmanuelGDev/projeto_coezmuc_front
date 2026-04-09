import YouTube from "react-youtube";

export default function VideoSection() {
  return (
    <section className="py-24 px-6 bg-[#F5EDE0]">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <span className="inline-block text-xs font-sans tracking-[0.2em] uppercase text-[#B07D4A] bg-[#F0E6D3] px-4 py-1.5 rounded-full mb-5">
            Edição Anterior
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3D2C1E] mb-4 leading-tight">
            Veja Como Foi 2026
          </h2>
          <p className="text-[#8C7355] text-base leading-relaxed max-w-xl mx-auto font-sans">
            Assista aos destaques do COEZMUC 2026 e reviva os momentos mais inspiradores,
            emocionantes e transformadores do evento.
          </p>
        </div>

        {/* Video container */}
        <div className="rounded-2xl overflow-hidden border border-[#E8DDD0] shadow-sm bg-[#3D2C1E]">
          <div className="w-full aspect-video">
            <YouTube
              videoId="JoDOUXg7UTw"
              opts={{
                width: "100%",
                height: "100%",
                playerVars: { autoplay: 0 },
              }}
              className="w-full h-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
}