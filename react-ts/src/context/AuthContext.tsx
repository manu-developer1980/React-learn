import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  login: (name: string) => void;
  logout: () => void;
}
interface AuthProps {
  children: ReactNode;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProps) {
  const [user, setUser] = useState<string | null>(null);

  const login = (name: string) => setUser(name);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
