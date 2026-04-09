type Props = {
    label: string;
    required?: boolean;
    children: React.ReactNode;
};

export function FormField({ label, required, children }: Props) {
    return (
        <div className="space-y-1.5">
            <label className="block text-xs font-sans tracking-widest uppercase text-[#8C7355]">
                {label}
                {required && <span className="text-[#C0623A] ml-1">*</span>}
            </label>
            {children}
        </div>
    );
}