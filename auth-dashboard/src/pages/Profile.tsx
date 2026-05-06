import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; //con useAuth nos traemos todo lo que se exporta del context
import LoadingSpinner from "../components/Layout/LoadingSpinner";

interface userDataType {
  id: number;
  name: string;
  email: string;
  role: string;
}
export default function Profile() {
  const { token, logout, apiFetch } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<userDataType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Carga asíncrona
    const loadProfile = async () => {
      //Comprobamos token antes de nada.
      if (!token) {
        logout();
        return;
      }
      try {
        //hacemos el fetch
        const data = await apiFetch("/api/auth/profile");
        setProfileData(data.userData);
        setError(null);
        setLoading(false);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Error de red al cargar el perfil",
        );
        setProfileData(null);
        setLoading(false);
      }
    };

    loadProfile();
  }, [token, apiFetch, logout]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
      <p>Datos del usuario autenticado.</p>
      <ul>
        <li>Nombre: {profileData?.name}</li>
        <li>Email: {profileData?.email}</li>
        <li>Rol: {profileData?.role}</li>
      </ul>
    </div>
  );
}
