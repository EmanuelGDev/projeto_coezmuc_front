export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <img src=".\src\assets\logo.png" alt="Logo" className="h-15 w-auto " />
          <span className="ml-2 text-lg font-bold text-gray-800">
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Inscrever-se
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-500 rounded-lg hover:bg-red-50 transition">
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}