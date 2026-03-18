import { useAuth } from "@/contexts/Context";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await login(email, password);
      toast.success("Login realizado com sucesso!");
      navigate("/");
      
    } catch (error) {
      toast.error("Credenciais inválidas. Tente novamente.");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-600 to-purple-900">
      <div className="bg-white border border-blue-400 shadow-lg rounded-xl w-full max-w-md p-8">

        <img
          className="pb-8 mx-auto"
          src="./../../src/assets/logo.png"
          alt="Logo"
        />

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => navigate("/auth/login")}
            className="cursor-pointer border border-blue-700 flex-1 py-2 font-semibold rounded-l-lg bg-blue-500 text-white"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/auth/register")}
            className="border border-blue-700 cursor-pointer flex-1 py-2 font-semibold rounded-r-lg bg-gray-200 text-blue-700"
          >
            Registro
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center">Entrar</h2>

          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleEmailKeyDown}
            className="border border-blue-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Campo senha com mostrar/ocultar */}
          <div className="relative">
            <input
              ref={passwordRef}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-blue-700 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              {showPassword ? "Ocultar Senha" : "Mostrar Senha"}
            </button>
          </div>
          


          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}

            {isLoading ? "Entrando..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
