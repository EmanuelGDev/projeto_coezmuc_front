import { useAuth } from "@/contexts/Context";
import Header from "@/components/Header";
import { useSubscription } from "@/hooks/useSubscription";
import type { PersonalData } from "./types";
import { PersonalDataForm } from "@/components/SubscriptionPage/PersonalDataForm";
import { HealthDataForm } from "@/components/SubscriptionPage/HealthDataForm";
import { ConsentSection } from "@/components/SubscriptionPage/ConsentSection";


export default function SubscriptionPage() {
    const { isLoading } = useAuth();
    const { personalData, healthData, handlePersonalChange, handleHealthChange, handleSubmit } =
        useSubscription();

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 space-y-8">
                    <h1 className="text-2xl font-semibold text-gray-800">Cadastro de Participante</h1>

                    <PersonalDataForm data={personalData} onChange={handlePersonalChange} />

                    <HealthDataForm data={healthData} onChange={handleHealthChange} />

                    <ConsentSection
                        imageConsent={personalData.imageConsent}
                        regulationsConsent={personalData.regulationsConsent}
                        onChange={(field, value) =>
                            handlePersonalChange(field as keyof PersonalData, value)
                        }
                    />

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Salvar Dados
                    </button>
                </div>
            </div>
        </>
    );
}
