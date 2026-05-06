import { useContext } from "react";
import { EstadoTarea, Tarea } from "../types/tarea";
import InputEdicion from "./InputEdicion";
import { TareasContext } from "../context/TareasContext";

interface Props {
  tareas: Tarea[];
  estado: EstadoTarea;
}

export default function KabanCard({ tareas, estado }: Props) {
  const { cambiarEstado, eliminarTarea, activarEdicion, guardarEdicion } =
    useContext(TareasContext)!;

  const capital = (texto: string) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  };

  const renderButtons = (estado: EstadoTarea, id: number) => {
    switch (estado) {
      case "incompleta":
        return (
          <button onClick={() => cambiarEstado(id, "iniciada")}>
            Iniciar Tarea
          </button>
        );
      case "iniciada":
        return (
          <>
            <button onClick={() => cambiarEstado(id, "completa")}>
              Completar
            </button>
            <button onClick={() => cambiarEstado(id, "incompleta")}>
              Pendiente
            </button>
          </>
        );

      case "completa":
        return (
          <>
            <button onClick={() => cambiarEstado(id, "iniciada")}>
              Iniciada
            </button>
            <button onClick={() => eliminarTarea(id)}>Borrar</button>
          </>
        );
    }
  };

  return (
    <>
      <ul className={`tareas${capital(estado)}s`}>
        <h5>{estado}</h5>
        {tareas.map((tarea: Tarea) => (
          <li
            key={tarea.id}
            className={tarea.estado}
          >
            <span
              onDoubleClick={() => {
                activarEdicion(tarea.id);
              }}
            >
              {tarea.modo === "lectura" ? (
                tarea.texto
              ) : (
                <InputEdicion
                  textoInicial={tarea.texto}
                  onGuardarEdicion={(nuevoTexto: string) =>
                    guardarEdicion(tarea.id, nuevoTexto)
                  }
                />
              )}
            </span>
            <span className="buttons">
              {renderButtons(tarea.estado, tarea.id)}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
