
import { HomePage } from "./pages/HomePage"
import SubscriptionsPage from "./pages/SubscriptionsPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/Context"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  )
}

export default App