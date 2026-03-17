import { useState } from "react";
import { useAuth } from "@/contexts/Context";

type PersonalData = {
    name: string;
    age: number;
    phoneNumber: string;
    city: string;
    centroEspirita: string;
    badgeName: string;
    emergencyContact?: string;
    minorsGuardianName?: string;
    address: string;
    imageConsent: boolean;
    regulationsConsent: boolean;
};

type HealthData = {
    restricaoAlimentar: string;
    restricaoMedica: string;
    cuidadosEspeciais: string;
};

export default function SubscriptionPage() {



    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <p>Carregando...</p>;
    }


    const [personalData, setPersonalData] = useState<PersonalData>({
        name: "",
        age: 0,
        phoneNumber: "",
        city: "",
        centroEspirita: "",
        badgeName: "",
        emergencyContact: "",
        minorsGuardianName: "",
        address: "",
        imageConsent: false,
        regulationsConsent: false,
    });

    const [healthData, setHealthData] = useState<HealthData>({
        restricaoAlimentar: "",
        restricaoMedica: "",
        cuidadosEspeciais: "",
    });

    
    const handlePersonalChange = (field: keyof PersonalData, value: string | number) => {
        setPersonalData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleHealthChange = (field: keyof HealthData, value: string) => {
        setHealthData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!user?.id) {
            alert("Usuário não autenticado");
            return;
        }

        const body = {
            userId: user?.id,
            personalData,
            healthData,
        };

        try {
            const response = await fetch("http://localhost:3333/subscription/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            console.log('Response data:', data);

            if (!response.ok) {
                throw new Error(data.message || "Erro ao salvar dados");
            }

            console.log("Sucesso:", data);
            alert("Cadastro realizado com sucesso!");
        } catch (error: any) {
            console.error("Erro:", error);
            console.error("Erro detalhado:", error.message);
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 space-y-8">

                <h1 className="text-2xl font-semibold text-gray-800">
                    Cadastro de Participante
                </h1>

                {/* Dados Pessoais */}
                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-gray-700">Dados Pessoais</h2>
                    <p>Seu Nome *</p>
                    <input
                        type="text"
                        placeholder="Nome completo"
                        value={personalData.name}
                        onChange={(e) => handlePersonalChange("name", e.target.value)}
                        className="w-full border rounded-lg p-2"
                        required
                    />
                    <p>Sua Idade *</p>
                    <input
                        type="number"
                        placeholder="Idade"
                        value={personalData.age}
                        onChange={(e) => handlePersonalChange("age", Number(e.target.value))}
                        className="w-full border rounded-lg p-2"
                        required
                    />
                    <p>Seu Telefone *</p>
                    <input
                        type="text"
                        placeholder="Telefone"
                        value={personalData.phoneNumber}
                        onChange={(e) => handlePersonalChange("phoneNumber", e.target.value)}
                        className="w-full border rounded-lg p-2"
                        required
                    />
                    <p>Sua Cidade *</p>
                    <input
                        type="text"
                        placeholder="Cidade"
                        value={personalData.city}
                        onChange={(e) => handlePersonalChange("city", e.target.value)}
                        className="w-full border rounded-lg p-2"
                        required
                    />
                    <p>Seu Endereço *</p>
                    <input
                        type="text"
                        placeholder="Endereço"
                        value={personalData.address}
                        onChange={(e) => handlePersonalChange("address", e.target.value)}
                        className="w-full border rounded-lg p-2"
                        required
                    />
                    <p>Centro Espirita Frequentado *</p>
                    <input
                        type="text"
                        placeholder="Centro Espírita"
                        value={personalData.centroEspirita}
                        onChange={(e) => handlePersonalChange("centroEspirita", e.target.value)}
                        className="w-full border rounded-lg p-2"
                        required
                    />
                    <p>Nome para Crachá *</p>
                    <input
                        type="text"
                        placeholder="Nome no Crachá"
                        value={personalData.badgeName}
                        onChange={(e) => handlePersonalChange("badgeName", e.target.value)}
                        className="w-full border rounded-lg p-2"
                        required
                    />
                    <p>Contato de Emergência</p>
                    <input
                        type="text"
                        placeholder="Contato de Emergência"
                        value={personalData.emergencyContact}
                        onChange={(e) => handlePersonalChange("emergencyContact", e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />
                    <p>Caso seja menor de idade</p>
                    <input
                        type="text"
                        placeholder="Nome do Responsável"
                        value={personalData.minorsGuardianName}
                        onChange={(e) => handlePersonalChange("minorsGuardianName", e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Dados de Saúde */}
                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-gray-700">Dados de Saúde</h2>
                    <p>Possui alguma restrição alimentar?</p>
                    <textarea
                        placeholder="Restrição Alimentar"
                        value={healthData.restricaoAlimentar}
                        onChange={(e) => handleHealthChange("restricaoAlimentar", e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />
                    <p>Possui alguma restrição médica?</p>
                    <textarea
                        placeholder="Restrição Médica"
                        value={healthData.restricaoMedica}
                        onChange={(e) => handleHealthChange("restricaoMedica", e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />
                    <p>Possui algum cuidado especial que devemos saber?</p>
                    <textarea
                        placeholder="Cuidados Especiais"
                        value={healthData.cuidadosEspeciais}
                        onChange={(e) => handleHealthChange("cuidadosEspeciais", e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
                <div className="space-y-3">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={personalData.imageConsent}
                            onChange={(e) =>
                                setPersonalData((prev) => ({
                                    ...prev,
                                    imageConsent: e.target.checked,
                                }))
                            }
                        />
                        Autorizo o uso da minha imagem
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={personalData.regulationsConsent}
                            onChange={(e) =>
                                setPersonalData((prev) => ({
                                    ...prev,
                                    regulationsConsent: e.target.checked,
                                }))
                            }
                        />
                        Declaro que li e aceito o regulamento
                    </label>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    Salvar Dados
                </button>
            </div>
        </div>
    );
}