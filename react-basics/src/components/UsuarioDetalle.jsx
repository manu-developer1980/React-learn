import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export default function UsuarioDetalle() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUsuario(data))
      .catch((error) => console.error("Error cargado usuarios:".error));
  }, [id]);
  if (!usuario)
    return (
      <>
        <LoadingSpinner />
      </>
    );
  return (
    <>
      <h2>{usuario.name}</h2>
      <p>Email: {usuario.email}</p>
      <p>Teléfono: {usuario.phone}</p>
      <p>Web: {usuario.website}</p>
      <br />
      <Link to="/">👈 Volver a inicio</Link>
    </>
  );
}
