import type { HealthData } from "../../../types/subscription";
import { FormField } from "./FormField";

type Props = {
    data: HealthData;
    onChange: (field: keyof HealthData, value: string) => void;
};

// ─── Restrição Alimentar ─────────────────────────────────────────────────────

const DIETARY_OPTIONS = [
    "Não",
    "Vegetariano",
    "Vegano",
    "Alergia a lactose",
    "Diabetes",
    "Outro: Informar à Coordenação Geral",
] as const;

// ─── Regime / Cuidados Especiais ─────────────────────────────────────────────

const REGIME_OPTIONS = [
    "Não",
    "Saúde (física ou mental) própria ou de familiar e/ou dependente",
    "Limitações físicas (pessoa idosa)",
    "Assistência a familiar e/ou dependente",
    "Trabalho em turnos, plantão ou escala",
    "Outro: Informar à Coordenação Geral",
] as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function stringToSet(value: string): Set<string> {
    return new Set(
        value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
    );
}

function setToString(set: Set<string>): string {
    return Array.from(set).join(", ");
}

function toggleOption(
    current: Set<string>,
    option: string,
    exclusiveOption: string
): Set<string> {
    const next = new Set(current);

    if (option === exclusiveOption) {
        // "Não" deseleciona tudo e seleciona só ele mesmo
        return next.has(option) ? new Set() : new Set([option]);
    }

    // Selecionar outra opção remove "Não"
    next.delete(exclusiveOption);

    if (next.has(option)) {
        next.delete(option);
    } else {
        next.add(option);
    }

    return next;
}

// ─── Estilos compartilhados ───────────────────────────────────────────────────

const textareaClass = `
    w-full border border-[#E8DDD0] rounded-lg px-4 py-2.5
    bg-[#FAF7F2] text-[#3D2C1E] text-base font-sans
    placeholder:text-[#C4B49A]
    focus:outline-none focus:border-[#B07D4A] focus:bg-white
    transition-colors duration-200
    resize-none min-h-[80px]
`;

// ─── Sub-componentes ──────────────────────────────────────────────────────────

type CheckboxGroupProps = {
    options: readonly string[];
    selected: Set<string>;
    exclusiveOption: string;
    onChange: (option: string) => void;
};

function CheckboxGroup({ options, selected, onChange }: CheckboxGroupProps) {
    return (
        <div className="flex flex-col gap-2 mt-1">
            {options.map((option) => {
                const checked = selected.has(option);
                return (
                    <label
                        key={option}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer border border-[#E8DDD0] bg-[#FAF7F2] hover:border-[#C4A87A] hover:bg-[#F5EDE1] transition-colors duration-200 select-none group"
                    >
                        {/* Input real — invisível, ativa o peer */}
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => onChange(option)}
                            className="sr-only peer"
                        />

                        {/* Caixa visual — reage ao peer-checked */}
                        <div className="
                            w-5 h-5 shrink-0 rounded border-2 border-[#D4C4B0]
                            bg-[#FAF7F2]
                            peer-checked:bg-[#B07D4A] peer-checked:border-[#B07D4A]
                            group-hover:border-[#B07D4A]
                            transition-all duration-200
                            flex items-center justify-center
                        ">
                            {checked && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>

                        <span className="text-sm font-medium text-[#3D2C1E] leading-snug">{option}</span>
                    </label>
                );
            })}
        </div>
    );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function HealthDataForm({ data, onChange }: Props) {
    const dietarySelected = stringToSet(data.restricaoAlimentar ?? "");
    const regimeSelected = stringToSet(data.cuidadosEspeciais ?? "");

    function handleDietaryChange(option: string) {
        const next = toggleOption(dietarySelected, option, "Não");
        onChange("restricaoAlimentar", setToString(next));
    }

    function handleRegimeChange(option: string) {
        const next = toggleOption(regimeSelected, option, "Não");
        onChange("cuidadosEspeciais", setToString(next));
    }

    return (
        <div className="space-y-6">
            {/* Restrição Alimentar */}
            <FormField label="Você possui alguma restrição alimentar?">
                <CheckboxGroup
                    options={DIETARY_OPTIONS}
                    selected={dietarySelected}
                    exclusiveOption="Não"
                    onChange={handleDietaryChange}
                />
            </FormField>

            {/* Alergia a Medicamento */}
            <FormField label="Você possui alergia a algum medicamento?">
                <textarea
                    placeholder="Descreva se possui alergia a algum medicamento"
                    value={data.restricaoMedica ?? ""}
                    onChange={(e) => onChange("restricaoMedica", e.target.value)}
                    className={textareaClass}
                />
            </FormField>

            {/* Seção informativa — Do Regime */}
            <div className="rounded-xl border border-[#E8DDD0] bg-[#FAF7F2] overflow-hidden">
                {/* Cabeçalho */}
                <div className="px-5 py-3 bg-[#F0E6D6] border-b border-[#E8DDD0]">
                    <h3 className="text-sm font-semibold text-[#3D2C1E] uppercase tracking-wide">
                        Do Regime
                    </h3>
                </div>

                <div className="px-5 py-4 space-y-4">
                    {/* Texto explicativo */}
                    <p className="text-sm text-[#5C4A36] leading-relaxed">
                        O encontro é realizado em regime de imersão com entrada no{" "}
                        <strong className="text-[#3D2C1E]">sábado às 16h</strong> e saída somente na{" "}
                        <strong className="text-[#3D2C1E]">terça-feira às 16h</strong>.
                    </p>

                    <p className="text-sm text-[#5C4A36] leading-relaxed">
                        Casos especiais serão tratados pela Coordenação Geral. Assim, assinale se você
                        tem alguma dificuldade listada abaixo e precisa pernoitar fora do evento:
                    </p>

                    {/* Checkboxes de regime */}
                    <CheckboxGroup
                        options={REGIME_OPTIONS}
                        selected={regimeSelected}
                        exclusiveOption="Não"
                        onChange={handleRegimeChange}
                    />

                    {/* Aviso importante */}
                    <div className="mt-4 rounded-lg border border-[#D4A96A] bg-[#FDF3E3] px-4 py-3">
                        <p className="text-xs font-semibold text-[#8C5A1A] uppercase tracking-wide mb-1">
                            Muito importante
                        </p>
                        <p className="text-xs text-[#5C4A36] leading-relaxed">
                            Para os casos especiais acima citados, que serão analisados pela Coordenação
                            Geral, o confraternista deverá obrigatoriamente obedecer aos horários de
                            entrada e saída diárias, que serão:{" "}
                            <strong className="text-[#3D2C1E]">entrada – 07h30</strong> e{" "}
                            <strong className="text-[#3D2C1E]">saída – 21h30</strong>, sob pena de ficar
                            de fora do evento em caso de desrespeito ao estipulado.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}