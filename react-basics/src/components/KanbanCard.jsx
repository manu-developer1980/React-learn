import React from "react";
import InputEdicion from "./InputEdicion";
export default function KabanCard({
  tareas,
  estado,
  cambiarEstado,
  borrarTarea,
  onActivarEdicion,
  guardarEdicion,
}) {
  const capital = (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  };

  const renderButtons = (estado, id) => {
    switch (estado) {
      case "pendiente":
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
            <button onClick={() => cambiarEstado(id, "pendiente")}>
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
            <button onClick={() => borrarTarea(id)}>Borrar</button>
          </>
        );
    }
  };

  return (
    <>
      <ul className={`tareas${capital(estado)}s`}>
        <h5>{estado}</h5>
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            className={tarea.estado}
          >
            <span
              onDoubleClick={() => {
                onActivarEdicion(tarea.id);
              }}
            >
              {tarea.modo === "lectura" ? (
                tarea.texto
              ) : (
                <InputEdicion
                  textoInicial={tarea.texto}
                  onGuardarEdicion={(nuevoTexto) =>
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
