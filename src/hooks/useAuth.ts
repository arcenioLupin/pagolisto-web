import { useAuthStore } from "@/store/useAuthStore"

export const useAuth = () => {
const { isAuthenticated, token, user, logout } = useAuthStore()
 
return { isAuthenticated, token, user, logout }
}
