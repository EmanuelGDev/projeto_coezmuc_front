
import type { PersonalData } from "types/subscription";
import { FormField } from "./FormField";

type Props = {
    data: PersonalData;
    onChange: (field: keyof PersonalData, value: string | number) => void;
};

const inputClass = "w-full border rounded-lg p-2";

const textFields: {
    field: keyof PersonalData;
    label: string;
    type?: string;
    placeholder: string;
    required?: boolean;
}[] = [
    { field: "name", label: "Seu Nome", type: "text", placeholder: "Nome completo", required: true },
    { field: "age", label: "Sua Idade", type: "number", placeholder: "Idade", required: true },
    { field: "phoneNumber", label: "Seu Telefone", type: "text", placeholder: "Telefone", required: true },
    { field: "city", label: "Sua Cidade", type: "text", placeholder: "Cidade", required: true },
    { field: "address", label: "Seu Endereço", type: "text", placeholder: "Endereço", required: true },
    { field: "centroEspirita", label: "Centro Espírita Frequentado", type: "text", placeholder: "Centro Espírita", required: true },
    { field: "badgeName", label: "Nome para Crachá", type: "text", placeholder: "Nome no Crachá", required: true },
    { field: "emergencyContact", label: "Contato de Emergência", type: "text", placeholder: "Contato de Emergência" },
    { field: "minorsGuardianName", label: "Caso seja menor de idade", type: "text", placeholder: "Nome do Responsável" },
];

export function PersonalDataForm({ data, onChange }: Props) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-700">Dados Pessoais</h2>

            {textFields.map(({ field, label, type, placeholder, required }) => (
                <FormField key={field} label={label} required={required}>
                    <input
                        type={type ?? "text"}
                        placeholder={placeholder}
                        value={data[field] as string | number}
                        onChange={(e) =>
                            onChange(field, type === "number" ? Number(e.target.value) : e.target.value)
                        }
                        className={inputClass}
                    />
                </FormField>
            ))}
        </div>
    );
}
