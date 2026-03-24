import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/Context";

export function PrivateTokenRoute({ children }: any) {

    const {user, isLoading} = useAuth()

    if(isLoading){
      return <div>Carregando</div>
    }
  if (!user?.token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}