import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

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
        console.log(datos);
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
            <li
              key={usuario.id}
              onClick={() => {
                verDetalles(usuario.id);
              }}
            >
              <span>{usuario.name}</span>
              {usuarioSeleccionado === usuario.id && (
                <div className="detalles">
                  <p>📧 {usuario.email}</p>
                  <p>🛜 {usuario.website}</p>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </>
  );
}
