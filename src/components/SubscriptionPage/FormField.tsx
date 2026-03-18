type Props = {
    label: string;
    required?: boolean;
    children: React.ReactNode;
};

export function FormField({ label, required, children }: Props) {
    return (
        <div className="space-y-1">
            <p className="text-sm text-gray-600">
                {label} {required && <span className="text-red-500">*</span>}
            </p>
            {children}
        </div>
    );
}
