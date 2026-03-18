import type { PersonalData } from "@/pages/Subscription/types";


type Props = {
    imageConsent: boolean;
    regulationsConsent: boolean;
    onChange: (field: keyof PersonalData, value: boolean) => void;
};

const consents: {
    field: keyof PersonalData;
    label: string;
}[] = [
    { field: "imageConsent", label: "Autorizo o uso da minha imagem *" },
    { field: "regulationsConsent", label: "Declaro que li e aceito o regulamento *" },
];

export function ConsentSection({ imageConsent, regulationsConsent, onChange }: Props) {
    const values: Record<string, boolean> = { imageConsent, regulationsConsent };

    return (
        <div className="space-y-3">
            {consents.map(({ field, label }) => (
                <label key={field} className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={values[field]}
                        onChange={(e) => onChange(field, e.target.checked)}
                    />
                    {label}
                </label>
            ))}
        </div>
    );
}
