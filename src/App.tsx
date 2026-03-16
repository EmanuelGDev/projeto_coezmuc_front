
import { HomePage } from "./pages/HomePage"
import SubscriptionsPage from "./pages/SubscriptionsPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/Context"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import { Toaster } from "sonner"
import SubscriptionPage from "./pages/SubscriptionPage"

function App() {
  return (
    <BrowserRouter>
      <Toaster/>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/subscription/*" element={<SubscriptionPage />} />
            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App