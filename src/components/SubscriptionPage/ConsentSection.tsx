import type { PersonalData } from "../../../types/subscription";

type Props = {
    imageConsent: boolean;
    regulationsConsent: boolean;
    onChange: (field: keyof PersonalData, value: string | number | boolean) => void;
};

const consents: {
    field: "imageConsent" | "regulationsConsent";
    label: string;
    description: string;
}[] = [
    {
        field: "imageConsent",
        label: "Autorizo o uso da minha imagem",
        description: "Concordo que fotos e vídeos do evento possam ser utilizados para fins institucionais.",
    },
    {
        field: "regulationsConsent",
        label: "Aceito o regulamento do evento",
        description: "Declaro que li e concordo com todas as normas e condições do evento.",
    },
];

export function ConsentSection({ imageConsent, regulationsConsent, onChange }: Props) {
    const values: Record<"imageConsent" | "regulationsConsent", boolean> = {
        imageConsent,
        regulationsConsent,
    };

    return (
        <div className="space-y-5">
            {/* Regulamento link */}
            <div className="flex items-center gap-2 p-4 bg-[#F5EDE0] rounded-lg border border-[#E8DDD0]">
                <svg className="w-4 h-4 text-[#B07D4A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm text-[#6B5240] font-sans">
                    Acesse o{" "}
                    <a
                        href="https://drive.google.com/file/d/17nxvRTpklBFdhWaLdsEOYKK_5svuf0l_/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B07D4A] underline underline-offset-2 hover:text-[#8A5E30] transition-colors"
                    >
                        regulamento completo
                    </a>
                    {" "}antes de prosseguir.
                </p>
            </div>

            {/* Checkboxes */}
            {consents.map(({ field, label, description }) => (
                <label
                    key={field}
                    className="flex items-start gap-4 cursor-pointer group"
                >
                    {/* Custom checkbox */}
                    <div className="relative mt-0.5 shrink-0">
                        <input
                            type="checkbox"
                            checked={values[field]}
                            onChange={(e) => onChange(field, e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="
                            w-5 h-5 rounded border-2 border-[#D4C4B0]
                            bg-[#FAF7F2]
                            peer-checked:bg-[#B07D4A] peer-checked:border-[#B07D4A]
                            group-hover:border-[#B07D4A]
                            transition-all duration-200
                            flex items-center justify-center
                        ">
                            {values[field] && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* Text */}
                    <div>
                        <p className="text-sm font-sans font-medium text-[#3D2C1E] leading-snug">
                            {label} <span className="text-[#C0623A]">*</span>
                        </p>
                        <p className="text-xs text-[#8C7355] mt-0.5 leading-relaxed">{description}</p>
                    </div>
                </label>
            ))}
        </div>
    );
}