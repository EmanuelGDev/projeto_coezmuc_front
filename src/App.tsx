import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/Context"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import { Toaster } from "sonner"
import SubscriptionPage from "./pages/Subscription/SubscriptionPage"
import { HomePage } from "./pages/Home/HomePage"
import { PrivateTokenRoute } from "./contexts/PrivateTokenRoute"
import {PrivateAdminRoute} from "./contexts/PrivateAdminRoute"
import AdminPage from "./pages/Admin/AdminPage"




function App() {
  return (
    <BrowserRouter>
      <Toaster/>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            
            <Route path="/admin" element={<PrivateAdminRoute><PrivateTokenRoute><AdminPage /></PrivateTokenRoute></PrivateAdminRoute>} />
            <Route path="/subscription/*" element={<PrivateTokenRoute><SubscriptionPage /></PrivateTokenRoute>} />
            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App