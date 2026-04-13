import { useAuth } from "@/contexts/Context";
import Header from "@/components/Header";
import { useSubscription } from "@/hooks/useSubscription";
import { PersonalDataForm } from "@/components/SubscriptionPage/PersonalDataForm";
import { HealthDataForm } from "@/components/SubscriptionPage/HealthDataForm";
import { ConsentSection } from "@/components/SubscriptionPage/ConsentSection";

export default function SubscriptionPage() {
    const { isLoading } = useAuth();
    const { personalData, healthData, handlePersonalChange, handleHealthChange, handleSubmit } =
        useSubscription();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
                <p className="text-[#8C7355] font-serif text-lg tracking-wide animate-pulse">
                    Carregando...
                </p>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#FAF7F2] px-4 py-12 md:py-16">

                {/* Hero banner */}
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <div className="inline-block mb-4">
                        <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#B07D4A] bg-[#F0E6D3] px-4 py-1.5 rounded-full">
                            Inscrição de Participante
                        </span>
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl text-[#3D2C1E] leading-tight mb-3">
                        Bem-vindo(a)
                    </h1>
                    <p className="text-[#8C7355] text-base leading-relaxed">
                        Preencha os dados abaixo para garantir sua participação.<br />
                        Campos marcados com <span className="text-[#C0623A]">*</span> são obrigatórios.
                    </p>
                </div>

                {/* Form card */}
                <div className="max-w-2xl mx-auto space-y-0">

                    {/* Section: Dados Pessoais */}
                    <div className="bg-white border border-[#E8DDD0] rounded-t-2xl overflow-hidden">
                        <div className="bg-[#F5EDE0] px-8 py-4 border-b border-[#E8DDD0]">
                            <div className="flex items-center gap-3">
                                <span className="w-7 h-7 rounded-full bg-[#B07D4A] flex items-center justify-center text-white text-xs font-sans font-semibold">
                                    1
                                </span>
                                <h2 className="font-serif text-lg text-[#3D2C1E]">Dados Pessoais</h2>
                            </div>
                        </div>
                        <div className="px-8 py-6">
                            <PersonalDataForm data={personalData} onChange={handlePersonalChange} />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[#E8DDD0]" />

                    {/* Section: Dados de Saúde */}
                    <div className="bg-white border-x border-[#E8DDD0] overflow-hidden">
                        <div className="bg-[#F5EDE0] px-8 py-4 border-b border-[#E8DDD0]">
                            <div className="flex items-center gap-3">
                                <span className="w-7 h-7 rounded-full bg-[#B07D4A] flex items-center justify-center text-white text-xs font-sans font-semibold">
                                    2
                                </span>
                                <h2 className="font-serif text-lg text-[#3D2C1E]">Dados de Saúde</h2>
                            </div>
                        </div>
                        <div className="px-8 py-6">
                            <HealthDataForm data={healthData} onChange={handleHealthChange} />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[#E8DDD0]" />

                    {/* Section: Consentimentos */}
                    <div className="bg-white border border-[#E8DDD0] rounded-b-2xl overflow-hidden">
                        <div className="bg-[#F5EDE0] px-8 py-4 border-b border-[#E8DDD0]">
                            <div className="flex items-center gap-3">
                                <span className="w-7 h-7 rounded-full bg-[#B07D4A] flex items-center justify-center text-white text-xs font-sans font-semibold">
                                    3
                                </span>
                                <h2 className="font-serif text-lg text-[#3D2C1E]">Termos e Consentimentos</h2>
                            </div>
                        </div>
                        <div className="px-8 py-6">
                            <ConsentSection
                                imageConsent={personalData.imageConsent}
                                regulationsConsent={personalData.regulationsConsent}
                                onChange={handlePersonalChange}
                            />
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="pt-6 pb-2">
                        <button
                            onClick={handleSubmit}
                            className="
                                cursor-pointer
                                w-full bg-[#3D2C1E] text-[#FAF7F2]
                                font-sans text-sm tracking-widest uppercase
                                py-4 rounded-xl
                                hover:bg-[#B07D4A]
                                active:scale-[0.99]
                                transition-all duration-300
                            "
                        >
                            Confirmar Inscrição
                        </button>
                        <p className="text-center text-xs text-[#B0A090] mt-3 font-sans">
                            Seus dados são tratados com segurança e privacidade.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}