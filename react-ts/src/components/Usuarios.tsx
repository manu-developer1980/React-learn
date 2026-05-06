import LoadingSpinner from "./LoadingSpinner";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { Usuario } from "../types/usuario";

export default function Usuarios() {
  const {
    data: usuarios,
    loading: carga,
    error,
  } = useFetch<Usuario[]>("https://jsonplaceholder.typicode.com/users");

  return (
    <>
      <h3>Usuarios</h3>
      {error && error}
      <ul className="usuarios">
        {carga && <LoadingSpinner />}
        {!carga &&
          usuarios?.map((usuario) => (
            <li>
              <Link to={`/usuario/${usuario.id}`}>
                <span>{usuario.name}</span>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
