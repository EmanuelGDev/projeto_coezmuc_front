import type { HealthData } from "types/types";
import { FormField } from "./FormField";

type Props = {
    data: HealthData;
    onChange: (field: keyof HealthData, value: string) => void;
};

const textareaClass = "w-full border rounded-lg p-2";

const healthFields: {
    field: keyof HealthData;
    label: string;
    placeholder: string;
}[] = [
    {
        field: "restricaoAlimentar",
        label: "Possui alguma restrição alimentar?",
        placeholder: "Restrição Alimentar",
    },
    {
        field: "restricaoMedica",
        label: "Possui alguma restrição médica?",
        placeholder: "Restrição Médica",
    },
    {
        field: "cuidadosEspeciais",
        label: "Possui algum cuidado especial que devemos saber?",
        placeholder: "Cuidados Especiais",
    },
];

export function HealthDataForm({ data, onChange }: Props) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-700">Dados de Saúde</h2>

            {healthFields.map(({ field, label, placeholder }) => (
                <FormField key={field} label={label}>
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
