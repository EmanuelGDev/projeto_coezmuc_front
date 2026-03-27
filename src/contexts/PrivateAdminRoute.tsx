
import { useAuth } from "@/contexts/Context";

export function PrivateAdminRoute({ children }: any) {

  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Carregando</div>
  }
  if (!user?.isAdmin) {
    return <div>Acesso negado</div>;
  }

  return children;
}