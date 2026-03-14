export default function Banner() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1592818868295-f527dbac420d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                    COEZMUC 2027
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
                    Confraternização Espírita da Zona do Mucurí - Inscreva-se já e venha estudar conosco sobre como podemos seguir Pelos Caminhos de Jesus
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <div className="flex items-center gap-2 text-lg">
                        <p>🗓️</p>
                        <span>06-10 de Fevereiro, 2027</span>
                    </div>
                    <div className="hidden sm:block w-px h-6 bg-gray-400"></div>
                    <div className="flex items-center gap-2 text-lg">
                        <p>📍</p>
                        <span>Escola Waldemar Rocha Neves, Teófilo Otoni</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className=" cursor-pointer px-20 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                        Inscreva-se
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                </div>
            </div>
        </section>
    );
}
