import { useAuth } from "@/contexts/Context";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const {user} = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3333/user/create", {
                method: "POST",
                headers: { "Content-Type": "application/json",
                    "Authorization" : `Bearer ${user?.token}`
                 },
                body: JSON.stringify({ username, email, password, confirmPassword }),
            });
            console.log("Resposta do servidor:", response);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Erro ao criar conta. Tente novamente.");
            }
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


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-600 to-purple-900">
            <div className="bg-white border-1 border-blue-400 shadow-lg rounded-xl w-full max-w-md p-8 bg-blue-500">
                <img className="pb-8" src="./..\src\assets\logo.png"></img>

                <div className="flex mb-6">
                    <button
                        onClick={() => navigate('/auth/login')}
                        className={" cursor-pointer border-1 border-blue-700 flex-1 py-2 font-semibold rounded-l-lg bg-gray-200 text-gray-600"}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate('/auth/register')}
                        className={" border-1 border-blue-700 cursor-pointer flex-1 py-2 font-semibold rounded-r-lg bg-blue-500 text-white"}
                    >
                        Registro
                    </button>
                </div>


                <div className="flex flex-col gap-4">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        
                        <h2 className="text-2xl font-bold text-center">Criar Conta</h2>

                        <input
                            id="username"
                            type="text"
                            placeholder="Nome de Usuário"
                            value={username}
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-blue-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
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

                        <div className="relative">
                            <input
                                ref={passwordRef}
                                id="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirmar Senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
        </div>
    );
}