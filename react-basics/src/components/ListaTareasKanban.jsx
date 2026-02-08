import { useEffect, useState, useRef, useContext } from "react";
import useInput from "../hooks/useInput";
import KanbanCard from "./KanbanCard";
import useTitle from "../hooks/useTitle";
import { TareasContext } from "../context/TareasContext";

export default function ListaTareasKanban() {
  const inputTarea = useInput("");
  const [stats, setStats] = useState(0);
  const {
    tareas,
    agregarTarea,
    eliminarTarea,
    cambiarEstado,
    activarEdicion,
    guardarEdicion,
  } = useContext(TareasContext);

  useTitle(`Kanban: ${tareas.length} tareas`);

  const cardStatuses = ["pendiente", "iniciada", "completa"];
  const inputRef = useRef(null);

  const handleAgregarTarea = (event) => {
    event.preventDefault();
    if (!inputTarea.value.trim()) return;
    console.log(inputTarea.value);
    agregarTarea(inputTarea.value);
    inputTarea.reset();
  };
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
          return tarea.estado === "incompleta";
        case "iniciada":
          return tarea.estado === "iniciada";
        case "completa":
          return tarea.estado === "completa";
        default:
          return true;
      }
    });

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

      <form onSubmit={handleAgregarTarea}>
        <input
          value={inputTarea.value}
          onChange={inputTarea.onChange}
          type="text"
          placeholder="Añadir tarea..."
          ref={inputRef}
        />
        <button type="submit">Añadir tarea</button>
      </form>
    </>
  );
}
