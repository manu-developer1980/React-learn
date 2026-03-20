import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface User {
  id: number;
  name?: string | null;
  email: string;
  role: string;
}

interface AuthContextType {
  user?: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  hydration: boolean;
  apiFetch: (path: string, options?: RequestInit) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [hydration, setHydration] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL as string;

  const login = (newToken: string, userData: User) => {
    setUser(userData);
    setToken(newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    setHydration(true);
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Helper apiFetch. Podemos especificar que ruta la API queremos.
  //
  const apiFetch = async (
    path: string,
    options: RequestInit = {},
    didRetry = false,
  ) => {
    const headers = new Headers(options.headers);
    if (token) headers.set("Authorization", `Bearer ${token}`);

    // Construimos la respuesta
    const response = await fetch(`${API_URL}${path}`, { ...options, headers });

    // La parseamos a JSON
    const data = await response.json();

    if (response.ok) return data;

    if (
      response.status === 401 &&
      data?.error === "Token expirado" &&
      !didRetry &&
      token
    ) {
      const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const refreshData = await refreshResponse.json();

      if (refreshResponse.ok && refreshData?.token) {
        setToken(refreshData.token);
        localStorage.setItem("token", refreshData.token);

        const retryHeaders = new Headers(options.headers);
        retryHeaders.set("Authorization", `Bearer ${refreshData.token}`);

        const retryResponse = await fetch(`${API_URL}${path}`, {
          ...options,
          headers: retryHeaders,
        });

        const retryBody = retryResponse.json();
        if (retryResponse.ok) return retryBody;
      }
      logout();
      throw new Error("Session expired");
    }
    throw new Error(data?.error ?? "Request failed");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, hydration, apiFetch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
