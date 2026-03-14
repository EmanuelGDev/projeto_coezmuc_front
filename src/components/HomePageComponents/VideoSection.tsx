
import YouTube from "react-youtube";

export default function VideoSection() {
    return (
        <section className="py-20 px-6 bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Veja Como Foi 2026
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Assista aos destaques do COEZMUC 2026 e reviva os momentos mais inspiradores, emocionantes e transformadores do evento.
                    </p>
                </div>

                <div className="flex justify-center w-full">
                    <div className="w-full max-w-4xl aspect-video">
                        <YouTube
                            videoId="JoDOUXg7UTw"
                            opts={{
                                width: "100%",
                                height: "100%",
                                playerVars: {
                                    autoplay: 0,
                                },
                            }}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
