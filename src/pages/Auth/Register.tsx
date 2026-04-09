import { useAuth } from "@/contexts/Context";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3333/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erro ao criar conta.");
      toast.success("Registro realizado com sucesso!");
      navigate("/auth/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current?.focus();
    }
  };

  const inputClass = `
    w-full border border-[#E8DDD0] rounded-lg px-4 py-3
    bg-[#FAF7F2] text-[#3D2C1E] text-sm font-sans
    placeholder:text-[#C4B49A]
    focus:outline-none focus:border-[#B07D4A] focus:bg-white
    transition-colors duration-200
  `;

  const fields = [
    { id: "username", label: "Nome de Usuário", type: "text", placeholder: "Como quer ser chamado(a)?", value: username, onChange: setUsername, autoFocus: true },
    { id: "email", label: "E-mail", type: "email", placeholder: "seu@email.com", value: email, onChange: setEmail, onKeyDown: handleEmailKeyDown },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1592818868295-f527dbac420d?q=80&w=1170&auto=format&fit=crop')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#1A0F07]/80" />

      <div className="relative z-10 w-full max-w-sm">

        <div className="text-center mb-8">
          
          <p className="text-xs font-sans tracking-[0.2em] uppercase text-[#D4A96A]">
            Área do Participante
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DDD0] overflow-hidden shadow-xl">

          {/* Tabs */}
          <div className="flex border-b border-[#E8DDD0]">
            <button
              onClick={() => navigate("/auth/login")}
              className="flex-1 py-3.5 text-xs font-sans tracking-[0.15em] uppercase text-[#8C7355] bg-[#FAF7F2] hover:bg-[#F0E6D3] transition-colors"
            >
              Entrar
            </button>
            <button
              onClick={() => navigate("/auth/register")}
              className="flex-1 py-3.5 text-xs font-sans tracking-[0.15em] uppercase text-[#FAF7F2] bg-[#3D2C1E] transition-colors"
            >
              Criar conta
            </button>
          </div>

          {/* Form */}
          <div className="p-8">
            <h2 className="font-serif text-2xl text-[#3D2C1E] mb-6 text-center">Criar Conta</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {fields.map(({ id, label, type, placeholder, value, onChange, autoFocus, onKeyDown }) => (
                <div key={id}>
                  <label className="block text-xs font-sans tracking-widest uppercase text-[#8C7355] mb-1.5">
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    autoFocus={autoFocus}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={onKeyDown}
                    className={inputClass}
                    required
                  />
                </div>
              ))}

              {/* Senha */}
              {[
                { id: "password", label: "Senha", placeholder: "••••••••", value: password, onChange: setPassword, ref: passwordRef },
                { id: "confirmPassword", label: "Confirmar Senha", placeholder: "••••••••", value: confirmPassword, onChange: setConfirmPassword },
              ].map(({ id, label, placeholder, value, onChange }) => (
                <div key={id}>
                  <label className="block text-xs font-sans tracking-widest uppercase text-[#8C7355] mb-1.5">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      id={id}
                      type={showPassword ? "text" : "password"}
                      placeholder={placeholder}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className={inputClass + " pr-24"}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#B07D4A] hover:text-[#8A5E30] font-sans transition-colors"
                    >
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="
                    w-full bg-[#3D2C1E] text-[#FAF7F2]
                    font-sans text-xs tracking-[0.2em] uppercase
                    py-3.5 rounded-lg
                    hover:bg-[#B07D4A]
                    active:scale-[0.99]
                    disabled:opacity-50
                    transition-all duration-300
                    flex items-center justify-center gap-2
                  "
                >
                  {isLoading && (
                    <div className="w-4 h-4 border-2 border-[#FAF7F2] border-t-transparent rounded-full animate-spin" />
                  )}
                  {isLoading ? "Criando conta..." : "Criar Conta"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-[#8C7355] mt-5 font-sans">
          COEZMUC — Zona do Mucuri
        </p>
      </div>
    </div>
  );
}