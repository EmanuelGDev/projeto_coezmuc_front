import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/Context";
import type { HealthData, PersonalData } from "../../types/subscription";







const initialPersonalData: PersonalData = {
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
};

const initialHealthData: HealthData = {
    restricaoAlimentar: "",
    restricaoMedica: "",
    cuidadosEspeciais: "",
};

export function useSubscription() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [personalData, setPersonalData] = useState<PersonalData>(initialPersonalData);
    const [healthData, setHealthData] = useState<HealthData>(initialHealthData);

    const handlePersonalChange = (field: keyof PersonalData, value: string | number | boolean) => {
        setPersonalData((prev) => ({ ...prev, [field]: value }));
    };

    const handleHealthChange = (field: keyof HealthData, value: string) => {
        setHealthData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!user?.id) {
            alert("Usuário não autenticado");
            return;
        }

        try {
            const response = await fetch("http://localhost:3333/subscription/create", {
                method: "POST",
                headers: { "Content-Type": "application/json",
                    "Authorization" : `Bearer ${user?.token}`
                 },
                body: JSON.stringify({ userId: user.id, personalData, healthData }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Preencha todos os campos obrigatórios.");
            }

            toast.success("Inscrição realizada com sucesso!");
            navigate("/");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return {
        personalData,
        healthData,
        handlePersonalChange,
        handleHealthChange,
        handleSubmit,
    };
}
