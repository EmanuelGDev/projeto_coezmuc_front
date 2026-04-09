import type { PersonalData } from "../../../types/subscription";
import { FormField } from "./FormField";

type Props = {
    data: PersonalData;
    onChange: (field: keyof PersonalData, value: string | number) => void;
};

const inputClass = `
    w-full border border-[#E8DDD0] rounded-lg px-4 py-2.5
    bg-[#FAF7F2] text-[#3D2C1E] text-sm font-sans
    placeholder:text-[#C4B49A]
    focus:outline-none focus:border-[#B07D4A] focus:bg-white
    transition-colors duration-200
`;

const textFields: {
    field: keyof PersonalData;
    label: string;
    type?: string;
    placeholder: string;
    required?: boolean;
}[] = [
    { field: "name", label: "Nome Completo", type: "text", placeholder: "Como você se chama?", required: true },
    { field: "age", label: "Idade", type: "number", placeholder: "Sua idade", required: true },
    { field: "phoneNumber", label: "Telefone", type: "text", placeholder: "(00) 00000-0000", required: true },
    { field: "city", label: "Cidade", type: "text", placeholder: "Sua cidade", required: true },
    { field: "address", label: "Endereço", type: "text", placeholder: "Rua, número, bairro", required: true },
    { field: "centroEspirita", label: "Centro Espírita Frequentado", type: "text", placeholder: "Nome do centro espírita", required: true },
    { field: "badgeName", label: "Nome para Crachá", type: "text", placeholder: "Como quer ser chamado(a)?", required: true },
    { field: "emergencyContact", label: "Contato de Emergência", type: "text", placeholder: "Nome e telefone" },
    { field: "minorsGuardianName", label: "Responsável (menores de idade)", type: "text", placeholder: "Nome do responsável" },
];

export function PersonalDataForm({ data, onChange }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {textFields.map(({ field, label, type, placeholder, required }) => (
                <FormField
                    key={field}
                    label={label}
                    required={required}
                >
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