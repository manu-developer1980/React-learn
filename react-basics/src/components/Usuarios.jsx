import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carga, setCarga] = useState(true);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const verDetalles = (id) => {
    if (usuarioSeleccionado === id) {
      setUsuarioSeleccionado(null);
    } else {
      setUsuarioSeleccionado(id);
    }
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setUsuarios(datos);
        setCarga(false);
      })
      .catch((error) => console.error("Error cargado usuarios:".error));
  }, []);

  return (
    <>
      <h3>Usuarios</h3>
      <ul className="usuarios">
        {carga ? (
          <LoadingSpinner />
        ) : (
          usuarios.map((usuario) => (
            <li>
              <Link to={`/usuario/${usuario.id}`}>
                <span>{usuario.name}</span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
