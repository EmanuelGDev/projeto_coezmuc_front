import { config } from "@/config/env";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const inputClass = `
  w-full border border-[#E8DDD0] rounded-lg px-4 py-3
  bg-[#FAF7F2] text-[#3D2C1E] text-sm font-sans
  placeholder:text-[#C4B49A]
  focus:outline-none focus:border-[#B07D4A] focus:bg-white
  transition-colors duration-200
`;

function Wrapper({ children }: { children: React.ReactNode }) {
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
          <div className="p-8">{children}</div>
        </div>
        <p className="text-center text-xs text-[#8C7355] mt-5 font-sans">
          COEZMUC — Zona do Mucuri
        </p>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [checking, setChecking] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setChecking(false);
      setTokenValid(false);
      return;
    }

    fetch(`${config.apiUrl}/auth/verify-reset-token?token=${encodeURIComponent(token)}`)
      .then((res) => setTokenValid(res.ok))
      .catch(() => setTokenValid(false))
      .finally(() => setChecking(false));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${config.apiUrl}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "Não foi possível redefinir sua senha.");
      }

      toast.success("Senha redefinida com sucesso!");
      navigate("/auth/login");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao redefinir senha.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (checking) {
    return (
      <Wrapper>
        <div className="flex justify-center py-6">
          <div className="w-6 h-6 border-2 border-[#B07D4A] border-t-transparent rounded-full animate-spin" />
        </div>
      </Wrapper>
    );
  }

  if (!tokenValid) {
    return (
      <Wrapper>
        <h2 className="font-serif text-2xl text-[#3D2C1E] mb-2 text-center">
          Link inválido
        </h2>
        <p className="text-sm font-sans text-[#8C7355] text-center mb-6">
          Este link de recuperação é inválido ou já expirou. Solicite um novo link.
        </p>
        <button
          type="button"
          onClick={() => navigate("/auth/forgot-password")}
          className="
            w-full bg-[#3D2C1E] text-[#FAF7F2]
            font-sans text-xs tracking-[0.2em] uppercase
            py-3.5 rounded-lg hover:bg-[#B07D4A]
            transition-all duration-300
          "
        >
          Solicitar novo link
        </button>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2 className="font-serif text-2xl text-[#3D2C1E] mb-6 text-center">
        Redefinir senha
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-sans tracking-widest uppercase text-[#8C7355] mb-1.5">
            Nova senha
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            required
            minLength={8}
          />
        </div>

        <div>
          <label className="block text-xs font-sans tracking-widest uppercase text-[#8C7355] mb-1.5">
            Confirmar senha
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
            required
            minLength={8}
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
            {isLoading ? "Salvando..." : "Redefinir senha"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
}