import { useEffect, useState, useRef } from "react";
import useInput from "../hooks/useInput";

export default function ListaTareas() {
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem("misTareas");
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  const [filtro, setFiltro] = useState("todas");

  const inputTarea = useInput("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("misTareas", JSON.stringify(tareas));
  }, [tareas]);

  const tareasFiltradas = tareas.filter((tarea) => {
    switch (filtro) {
      case "pendientes":
        return tarea.estado === "incompleta";
        break;
      case "completadas":
        return tarea.estado === "completa";
        break;
      default:
        return true;
    }
  });

  const agregarTarea = (evento) => {
    evento.preventDefault();
    if (!inputTarea.value.trim()) return;

    const tareaObject = {
      id: Date.now(),
      texto: inputTarea.value,
      estado: "incompleta",
    };
    setTareas([...tareas, tareaObject]);
    inputTarea.reset();
  };

  const eliminarTarea = (id) => {
    const tareasFiltradas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasFiltradas);
  };

  const completarTarea = (id) => {
    const nuevasTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return { ...tarea, estado: "completa" };
      }
      return tarea;
    });
    setTareas(nuevasTareas);
  };

  return (
    <>
      <h3>ListaTareas</h3>
      {tareas.length > 0 ? (
        <ul>
          {tareasFiltradas.map((tarea) => (
            <li
              key={tarea.id}
              className={
                tarea.estado === "completa" ? "completa" : "incompleta"
              }
            >
              <span>{tarea.texto}</span>
              <span className="buttons">
                {tarea.estado === "incompleta" && (
                  <button onClick={() => completarTarea(tarea.id)}>
                    Completar
                  </button>
                )}
                <button onClick={() => eliminarTarea(tarea.id)}>Borrar</button>
              </span>
            </li>
          ))}
          <div className="filtros">
            <button onClick={() => setFiltro("completadas")}>Completas</button>
            <button onClick={() => setFiltro("pendientes")}>Pendientes</button>
            <button onClick={() => setFiltro("todas")}>Todas</button>
          </div>
        </ul>
      ) : (
        <p>No hay tareas todavía.</p>
      )}
      <form onSubmit={agregarTarea}>
        <input
          value={inputTarea.value}
          onChange={inputTarea.onChange}
          type="text"
          placeholder="Añadir tarea..."
          ref={inputRef}
        />
        <button
          type="submit"
          onSubmit={agregarTarea}
        >
          Añadir tarea
        </button>
      </form>
    </>
  );
}
