const bankDetails = [
    { label: "Beneficiário", value: "Aliança Municipal Espírita de Teófilo Otoni" },
    { label: "Banco", value: "AC Crédito (756)" },
    { label: "Cooperativa", value: "4071-1" },
    { label: "Conta", value: "25.692.001-0" },
    { label: "CNPJ", value: "21.084.157/0001-12" },
    { label: "PIX", value: "21084157000112" },
];

const prices = [
    { range: "3 a 5 anos", value: "R$ 160,00" },
    { range: "6 a 10 anos", value: "R$ 215,00" },
    { range: "Acima de 11 anos", value: "R$ 430,00" },
];

export function InfoSection() {
    return (
        <div className="space-y-0">

            {/* Divider between form and info */}
            <div className="h-px bg-[#E8DDD0]" />

            {/* Section: Informações Financeiras */}
            <div className="bg-white border-x border-[#E8DDD0] overflow-hidden">
                <div className="bg-[#F5EDE0] px-8 py-4 border-b border-[#E8DDD0]">
                    <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-[#B07D4A] flex items-center justify-center text-white text-xs font-sans font-semibold">
                            4
                        </span>
                        <h2 className="font-serif text-lg text-[#3D2C1E]">Informações Financeiras</h2>
                    </div>
                </div>

                <div className="px-8 py-6 space-y-6">

                    {/* Payment instructions */}
                    <div className="space-y-2">
                        <p className="text-sm font-sans font-medium text-[#8C7355] uppercase tracking-widest">Formas de Pagamento</p>
                        <ul className="space-y-2">
                            {[
                                "Pagamento à vista ou parcelado via PIX, ou por transferência bancária.",
                                "A quantidade de parcelas é condicionada à data de inscrição — a última parcela não poderá ultrapassar 20/01/2026.",
                                "Favor informar o nome do responsável no campo \"Observações\" do PIX.",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-[#5A4030] font-sans leading-relaxed">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B07D4A] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Bank details */}
                    <div className="rounded-xl border border-[#E8DDD0] overflow-hidden">
                        <div className="bg-[#F5EDE0] px-5 py-3 border-b border-[#E8DDD0]">
                            <p className="text-xs font-sans font-medium text-[#8C7355] uppercase tracking-widest">Dados Bancários</p>
                        </div>
                        <div className="divide-y divide-[#F0E8DE]">
                            {bankDetails.map(({ label, value }) => (
                                <div key={label} className="flex items-center justify-between px-5 py-3 gap-4">
                                    <span className="text-sm text-[#A08060] font-sans shrink-0">{label}</span>
                                    <span className="text-sm text-[#3D2C1E] font-sans font-medium text-right">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Send receipt */}
                    <div className="flex items-start gap-3 p-4 bg-[#F5EDE0] rounded-lg border border-[#E8DDD0]">
                        <svg className="w-5 h-5 text-[#B07D4A] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-sm text-[#6B5240] font-sans leading-relaxed">
                            Envie o comprovante para{" "}
                            <a
                                href="https://wa.me/5533988627765"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B07D4A] underline underline-offset-2 hover:text-[#8A5E30] transition-colors font-medium"
                            >
                                Aziz — (33) 98862-7765
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#E8DDD0]" />

            {/* Section: Informações Gerais */}
            <div className="bg-white border border-[#E8DDD0] rounded-b-2xl overflow-hidden">
                <div className="bg-[#F5EDE0] px-8 py-4 border-b border-[#E8DDD0]">
                    <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-[#B07D4A] flex items-center justify-center text-white text-xs font-sans font-semibold">
                            5
                        </span>
                        <h2 className="font-serif text-lg text-[#3D2C1E]">Informações Gerais</h2>
                    </div>
                </div>

                <div className="px-8 py-6 space-y-6">

                    {/* Dates grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-xl border border-[#E8DDD0] p-5 space-y-1.5">
                            <p className="text-xs font-sans font-medium text-[#8C7355] uppercase tracking-widest">Prazo para Inscrição</p>
                            <p className="text-base text-[#3D2C1E] font-sans font-medium">20/06/2025 – 20/12/2025</p>
                            <p className="text-sm text-[#A08060] font-sans">Vagas limitadas.</p>
                            <div className="pt-1 border-t border-[#F0E8DE]">
                                <p className="text-sm text-[#B07D4A] font-sans font-medium">Lista de espera até 20/01/2026</p>
                            </div>
                        </div>
                        <div className="rounded-xl border border-[#E8DDD0] p-5 space-y-1.5">
                            <p className="text-xs font-sans font-medium text-[#8C7355] uppercase tracking-widest">Prazo para Pagamento</p>
                            <p className="text-base text-[#3D2C1E] font-sans font-medium">À vista até 20/01/2026</p>
                            <p className="text-sm text-[#A08060] font-sans">Inscrição confirmada somente após o pagamento.</p>
                            <div className="pt-1 border-t border-[#F0E8DE]">
                                <p className="text-sm text-[#B07D4A] font-sans font-medium">Parcelado: última parcela até 20/01/2026</p>
                            </div>
                        </div>
                    </div>

                    {/* Investment */}
                    <div className="space-y-3">
                        <p className="text-xs font-sans font-medium text-[#8C7355] uppercase tracking-widest">Investimento</p>
                        <div className="rounded-xl border border-[#E8DDD0] overflow-hidden">
                            {prices.map(({ range, value }, i) => (
                                <div
                                    key={range}
                                    className={`flex items-center justify-between px-5 py-3.5 gap-4 ${i < prices.length - 1 ? "border-b border-[#F0E8DE]" : ""}`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#B07D4A] shrink-0" />
                                        <span className="text-sm text-[#5A4030] font-sans">Confraternistas de {range}</span>
                                    </div>
                                    <span className="text-base text-[#3D2C1E] font-sans font-semibold">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <p className="text-xs font-sans font-medium text-[#8C7355] uppercase tracking-widest">Local do Encontro</p>
                        <div className="flex items-start gap-3 p-4 bg-[#F5EDE0] rounded-lg border border-[#E8DDD0]">
                            <svg className="w-5 h-5 text-[#B07D4A] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div>
                                <p className="text-sm text-[#3D2C1E] font-sans font-medium leading-snug">
                                    Escola Estadual Dr. Waldemar Neves da Rocha — Polivalente
                                </p>
                                <p className="text-sm text-[#8C7355] font-sans mt-0.5">
                                    R. José Augusto Faria, 780 — São João, Teófilo Otoni - MG, 39802-331
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Warning */}
                    <div className="flex items-start gap-3 p-4 rounded-lg border border-[#E0C8B0] bg-[#FDF6EE]">
                        <svg className="w-5 h-5 text-[#C0623A] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div className="space-y-1">
                            <p className="text-sm text-[#3D2C1E] font-sans font-medium leading-snug">Atenção</p>
                            <p className="text-sm text-[#6B5240] font-sans leading-relaxed">
                                Não será permitida a entrada de confraternistas após o horário de abertura, nem a saída antecipada do evento (Vide Regulamento, item 7). Casos excepcionais deverão ser tratados com a Coordenação Geral.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}