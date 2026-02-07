import { useEffect, useState, useRef } from "react";
import useInput from "../hooks/useInput";
import KanbanCard from "./KanbanCard";
import useLocalStorage from "../hooks/useLocalStorage";
import useTitle from "../hooks/useTitle";

export default function ListaTareasKanban() {
  const [tareas, setTareas] = useLocalStorage("miLista", []);

  const [stats, setStats] = useState(0);

  const inputTarea = useInput("");
  const inputRef = useRef(null);

  useTitle(`Kanban: ${tareas.length} tareas`);

  const cardStatuses = ["pendiente", "iniciada", "completa"];

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    let completas = tareas.filter(
      (tarea) => tarea.estado === "completa",
    ).length;
    setStats(Math.floor((completas / tareas.length) * 100));
  }, [tareas]);

  const filtraTareas = (filtro, tareas) =>
    tareas.filter((tarea) => {
      switch (filtro) {
        case "pendiente":
          return tarea.estado === "pendiente";
        case "iniciada":
          return tarea.estado === "iniciada";
        case "completa":
          return tarea.estado === "completa";
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
      estado: "pendiente",
      modo: "lectura",
    };
    setTareas([...tareas, tareaObject]);
    inputTarea.reset();
  };

  const eliminarTarea = (id) => {
    const tareasFiltradas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasFiltradas);
  };

  const cambiarEstado = (id, estado) => {
    const nuevasTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return { ...tarea, estado: estado };
      }
      return tarea;
    });
    setTareas(nuevasTareas);
  };

  const activarEdicion = (id) => {
    const nuevasTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return {
          ...tarea,
          modo: tarea.modo === "lectura" ? "edicion" : "lectura",
        };
      }
      return tarea;
    });
    setTareas(nuevasTareas);
  };

  const guardarEdicion = (id, nuevoTexto) => {
    const nuevasTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return {
          ...tarea,
          texto: nuevoTexto,
          modo: "lectura",
        };
      }
      return tarea;
    });
    setTareas(nuevasTareas);
  };
  return (
    <>
      {tareas.length > 0 ? (
        <>
          <section className="kanban">
            {cardStatuses.map((cardStatus) => (
              <KanbanCard
                key={cardStatus}
                tareas={filtraTareas(cardStatus, tareas)}
                estado={cardStatus}
                cambiarEstado={cambiarEstado}
                borrarTarea={eliminarTarea}
                filtraTareas={filtraTareas}
                onActivarEdicion={activarEdicion}
                guardarEdicion={guardarEdicion}
              />
            ))}
          </section>
          <section className="stats">
            <h2>Completado</h2>
            <div>{stats} %</div>
          </section>
        </>
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
