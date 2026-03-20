import type { PersonalData } from "types/types";



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
            <p>Acesse aqui o <a href="https://drive.google.com/file/d/17nxvRTpklBFdhWaLdsEOYKK_5svuf0l_/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                regulamento
            </a>
            </p>
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
