import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "@/contexts/Context";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

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
    <header className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-auto cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-[#B07D4A] rounded-lg hover:bg-[#3D2C1E] transition"
            onClick={() => navigate(user ? "/subscription" : "/auth/login")}
          >
            Faça sua inscrição
          </button>

          {!user ? (
            <button
              className="cursor-pointer px-4 py-2 text-sm font-medium text-[#B07D4A] border border-[#B07D4A] rounded-lg hover:bg-blue-50 transition"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded-lg transition"
              >
                <span className="w-8 h-8 rounded-full bg-[#B07D4A] text-white flex items-center justify-center font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </span>
                {user.name?.split(" ")[0] || "Usuário"}
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-400 rounded-xl shadow-lg z-50 overflow-hidden">
                  <DropdownItems user={user} navigate={navigate} setOpen={setDropdownOpen} onLogout={handleLogout} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile: hambúrguer */}
        <button
          className="sm:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-2">
          <button
            className="w-full px-4 py-2 text-sm font-medium text-white bg-[#B07D4A] rounded-lg hover:bg-[#3D2C1E] transition"
            onClick={() => { navigate(user ? "/subscription" : "/auth/login"); setMobileMenuOpen(false); }}
          >
            Faça sua inscrição
          </button>

          {!user ? (
            <button
              className="w-full px-4 py-2 text-sm font-medium text-[#B07D4A] border border-[#B07D4A] rounded-lg hover:bg-blue-50 transition"
              onClick={() => { navigate("/auth/login"); setMobileMenuOpen(false); }}
            >
              Login
            </button>
          ) : (
            <>
              {/* Identificação do usuário */}
              <div className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 font-medium">
                <span className="w-8 h-8 rounded-full bg-[#B07D4A] text-white flex items-center justify-center font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </span>
                {user.name?.split(" ")[0] || "Usuário"}
              </div>
              <div className="border-t border-gray-100" />
              <DropdownItems user={user} navigate={navigate} setOpen={setMobileMenuOpen} onLogout={handleLogout} />
            </>
          )}
        </div>
      )}
    </header>
  );
}

// Itens compartilhados entre dropdown desktop e menu mobile
function DropdownItems({
  user,
  navigate,
  setOpen,
  onLogout,
}: {
  user: any;
  navigate: (path: string) => void;
  setOpen: (v: boolean) => void;
  onLogout: () => void;
}) {
  return (
    <>
      <button
        onClick={() => { navigate("/my-subscriptions"); setOpen(false); }}
        className="cursor-pointer w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
      >
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Minhas inscrições
      </button>

      {user?.isAdmin && (
        <>
          <div className="border-t border-gray-100" />
          <button
            onClick={() => { navigate("/admin"); setOpen(false); }}
            className="cursor-pointer w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            Painel Admin
          </button>

          <button
            onClick={() => { navigate("/admin/financeiro"); setOpen(false); }}
            className="cursor-pointer w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
            Painel Financeiro
          </button>
        </>
      )}

      <div className="border-t border-gray-100" />
      <button
        onClick={onLogout}
        className="cursor-pointer w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Sair
      </button>
    </>
  );
}