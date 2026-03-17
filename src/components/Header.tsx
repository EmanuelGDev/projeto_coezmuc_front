import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "@/contexts/Context";

export default function Header() {

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  console.log('user:', user);

  const handleLogout = () => {
    logout();
    navigate('/');
  }


  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-15 w-auto cursor-pointer"
            onClick={() => navigate('/')}
          />
          <span className="ml-2 text-lg font-bold text-gray-800">
          </span>
        </div>
        <div className="flex items-center gap-3">
          <p>Olá, {user?.name?.split(" ")[0] || 'usuário'}</p>
          <button
            className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate(user ? '/subscription' : '/auth/login')}>
            Faça sua inscrição
          </button>
          {!user ? (
            <button
              className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-50 transition"
              onClick={() => navigate('/auth/login')}
            >
              <p>{user}</p>
              Login
            </button>
          ) : (
            <button
              className="px-4 py-2 text-sm font-medium text-red-600 border border-red-500 rounded-lg hover:bg-red-50 transition"
              onClick={handleLogout}
            >
              Sair
            </button>
            
          )}
        </div>
      </div>
    </header>
  )
}
