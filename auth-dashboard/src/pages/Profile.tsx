import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; //con useAuth nos traemos todo lo que se exporta del context
import LoadingSpinner from "../components/Layout/LoadingSpinner";

export default function Profile() {
  const { token, logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<any>(null);
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
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        //Recuperar los datos del response y parseamos el json
        const data = await response.json();
        if (response.ok) {
          setProfileData(data.userData);
          setError(null);
          setLoading(false);
          return;
        }
        if (response.status === 401) {
          setError(data.error ?? "No autorizado");
          setProfileData(null);
          setLoading(false);
          logout();
        }
      } catch (e) {
        setError("Error de red al cargar el perfil");
        setProfileData(null);
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

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
