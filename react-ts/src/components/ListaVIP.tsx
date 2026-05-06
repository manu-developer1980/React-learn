import { useState } from "react";

interface Invitado {
  id: number;
  nombre: string;
  vip: boolean;
}
export default function ListaVIP() {
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [nuevoInvitado, setNuevoInvitado] = useState("");

  const agregarInvitado = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nuevoInvitado.trim()) return;
    const nuevoInvitadoObj = {
      id: Date.now(),
      nombre: nuevoInvitado,
      vip: false,
    };

    setInvitados([...invitados, nuevoInvitadoObj]);
    setNuevoInvitado("");
  };

  const cambiarStatus = (id: number) => {
    const nuevaLista = invitados.map((invitado) => {
      if (invitado.id === id) {
        return { ...invitado, vip: !invitado.vip };
      }
      return invitado;
    });
    setInvitados(nuevaLista);
  };

  const borrarInvitado = (id: number) => {
    const invitadosFiltrados = invitados.filter(
      (invitado) => invitado.id !== id,
    );
    setInvitados(invitadosFiltrados);
  };

  return (
    <>
      <h3>listaVIP</h3>
      <>
        {invitados.length > 0 && invitados.length <= 10 && (
          <ul>
            {invitados.map((invitado) => (
              <li key={invitado.id}>
                <span className="vipStatus">
                  {invitado.vip === true ? "🌟" : "👤"}
                </span>
                <span className="nombre">{invitado.nombre}</span>
                <span className="acciones">
                  <button onClick={() => cambiarStatus(invitado.id)}>
                    Cambiar a {invitado.vip ? "Tieso" : "VIP    "}
                  </button>
                  <button onClick={() => borrarInvitado(invitado.id)}>
                    Borrar
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={agregarInvitado}>
          <input
            value={nuevoInvitado}
            type="text"
            onChange={(e) => setNuevoInvitado(e.target.value)}
            disabled={invitados.length >= 10} // Deshabilita el input si está lleno
            placeholder={
              invitados.length >= 10
                ? "Aforo completo ⛔"
                : "Añadir invitado..."
            }
          />
          <button
            type="submit"
            disabled={invitados.length >= 10}
          >
            {invitados.length < 10 ? "Añadir invitado" : "Aforo Completo"}
          </button>
        </form>
      </>
      {invitados.length === 0 && (
        <p>No hay invitados en la lista. Añádelos con el formulario.</p>
      )}
      {invitados.length >= 10 && (
        <>
          <p>Ya no puedes añadir más invitados. Borra alguno de la lista</p>
        </>
      )}
      Total: {invitados.length}
    </>
  );
}
