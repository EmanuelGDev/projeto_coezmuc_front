import type { HealthData } from "../../../types/subscription";
import { FormField } from "./FormField";

type Props = {
    data: HealthData;
    onChange: (field: keyof HealthData, value: string) => void;
};

const textareaClass = `
    w-full border border-[#E8DDD0] rounded-lg px-4 py-2.5
    bg-[#FAF7F2] text-[#3D2C1E] text-sm font-sans
    placeholder:text-[#C4B49A]
    focus:outline-none focus:border-[#B07D4A] focus:bg-white
    transition-colors duration-200
    resize-none min-h-[80px]
`;

const healthFields: {
    field: keyof HealthData;
    label: string;
    placeholder: string;
}[] = [
    {
        field: "restricaoAlimentar",
        label: "Restrição Alimentar",
        placeholder: "Descreva alguma restrição alimentar, se houver...",
    },
    {
        field: "restricaoMedica",
        label: "Restrição Médica",
        placeholder: "Descreva alguma restrição médica, se houver...",
    },
    {
        field: "cuidadosEspeciais",
        label: "Cuidados Especiais",
        placeholder: "Há algo que devemos saber para melhor cuidar de você?",
    },
];

export function HealthDataForm({ data, onChange }: Props) {
    return (
        <div className="space-y-5">
            {healthFields.map(({ field, label, placeholder }) => (
                <FormField key={String(field)} label={label}>
                    <textarea
                        placeholder={placeholder}
                        value={data[field]}
                        onChange={(e) => onChange(field, e.target.value)}
                        className={textareaClass}
                    />
                </FormField>
            ))}
        </div>
    );
}