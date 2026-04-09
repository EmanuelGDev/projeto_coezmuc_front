import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "@/contexts/Context";
import { SubscriptionModal } from "./UserSubscriptionsModal/SubscriptionModal";


export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false)

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        </div>

        <div className="flex items-center gap-3">
          <button
            className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-[#B07D4A] rounded-lg hover:bg-[#3D2C1E] transition"
            onClick={() => navigate(user ? '/subscription' : '/auth/login')}
          >
            Faça sua inscrição
          </button>

          {!user ? (
            <button
              className="cursor-pointer px-4 py-2 text-sm font-medium text-[#B07D4A] border border-[#B07D4A] rounded-lg hover:bg-blue-50 transition"
              onClick={() => navigate('/auth/login')}
            >
              Login
            </button>
          ) : (
            <div className="relative " ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded-lg transition"
              >
                <span className="w-8 h-8 rounded-full bg-[#B07D4A] text-white flex items-center justify-center font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </span>
                {user.name?.split(" ")[0] || 'Usuário'}
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <SubscriptionModal
                userId={user.id}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-400 rounded-xl shadow-lg z-50 overflow-hidden">
                  <button
                    onClick={() => { setModalOpen(true); setDropdownOpen(false); }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Minhas inscrições
                  </button>

                  <div className="border-t border-gray-100" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sair
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}