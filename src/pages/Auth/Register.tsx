import { useAuth } from "@/contexts/Context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log("Entrou no handleSubmit");
            const response = await login(email, password);
            toast.success('Login realizado com sucesso!');
            navigate('/');
        } catch (error) {
            console.error("Erro ao processar login:", error);

            toast.error('Erro ao processar. Tente novamente.');
        } finally {
            setIsLoading(false);
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
                    <h2 className="text-2xl font-bold text-center">Criar Conta</h2>

                    <input
                        type="text"
                        placeholder="Nome"
                        className="border border-blue-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-blue-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        className="border border-blue-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Confirmar Senha"
                        className="border border-blue-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                        Registrar
                    </button>
                </div>

            </div>
        </div>
    );
}