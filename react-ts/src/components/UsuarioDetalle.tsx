import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import LoadingSpinner from "./LoadingSpinner";
import { Usuario } from "../types/usuario";

export default function UsuarioDetalle() {
  const { id } = useParams();
  const {
    data: usuario,
    loading: carga,
    error,
  } = useFetch<Usuario>(`https://jsonplaceholder.typicode.com/users/${id}`);

  return (
    <>
      {carga && <LoadingSpinner />}
      {error && <p>Error: {error.message}</p>}
      {usuario && (
        <>
          <h2>{usuario.name}</h2>
          <p>Email: {usuario.email}</p>
          <p>Teléfono: {usuario.phone}</p>
          <p>Web: {usuario.website}</p>
          <br />
          <Link to="/">👈 Volver a inicio</Link>
        </>
      )}
    </>
  );
}
