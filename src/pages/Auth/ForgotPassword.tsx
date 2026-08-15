import { config } from "@/config/env";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const inputClass = `
    w-full border border-[#E8DDD0] rounded-lg px-4 py-3
    bg-[#FAF7F2] text-[#3D2C1E] text-sm font-sans
    placeholder:text-[#C4B49A]
    focus:outline-none focus:border-[#B07D4A] focus:bg-white
    transition-colors duration-200
  `;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${config.apiUrl}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "Não foi possível processar sua solicitação.");
      }

      setSent(true);
      toast.success("Email de recuperação enviado!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao enviar email.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="p-8">
            <h2 className="font-serif text-2xl text-[#3D2C1E] mb-2 text-center">
              Recuperar senha
            </h2>

            {sent ? (
              <>
                <p className="text-sm font-sans text-[#8C7355] text-center mb-6">
                  Se o email existir em nossa base, você receberá um link de recuperação em instantes. Verifique também a caixa de spam.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/auth/login")}
                  className="
                    w-full bg-[#3D2C1E] text-[#FAF7F2]
                    font-sans text-xs tracking-[0.2em] uppercase
                    py-3.5 rounded-lg hover:bg-[#B07D4A]
                    transition-all duration-300
                  "
                >
                  Voltar ao login
                </button>
              </>
            ) : (
              <>
                <p className="text-sm font-sans text-[#8C7355] text-center mb-6">
                  Informe seu email para receber um link de redefinição de senha.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-sans tracking-widest uppercase text-[#8C7355] mb-1.5">
                      E-mail
                    </label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      autoFocus
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                      required
                    />
                  </div>

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
                      {isLoading ? "Enviando..." : "Enviar link"}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/auth/login")}
                    className="w-full text-center text-xs font-sans text-[#B07D4A] hover:text-[#8A5E30] hover:underline transition-colors pt-1"
                  >
                    Voltar ao login
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-[#8C7355] mt-5 font-sans">
          COEZMUC — Zona do Mucuri
        </p>
      </div>
    </div>
  );
}