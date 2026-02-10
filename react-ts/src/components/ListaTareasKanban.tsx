import { useEffect, useState, useContext, useRef } from "react";
import KanbanCard from "./KanbanCard";
import { TareasContext } from "../context/TareasContext";
import { Tarea, EstadoTarea } from "../types/tarea";

export default function ListaTareasKanban() {
  const { tareas, agregarTarea } = useContext(TareasContext)!;
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [stats, setStats] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const cardStatuses: EstadoTarea[] = ["incompleta", "iniciada", "completa"];

  const handleAgregarTarea = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nuevaTarea.trim()) return; // Si está vacío, no hacemos nada

    agregarTarea(nuevaTarea); // Usamos la función del contexto
    setNuevaTarea(""); // Limpiamos el input
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (tareas.length === 0) {
      setStats(0);
      return;
    }
    const completas = tareas.filter((t) => t.estado === "completa").length;
    setStats(Math.floor((completas / tareas.length) * 100));
  }, [tareas]);

  const filtraTareas = (filtro: EstadoTarea, tareas: Tarea[]) => {
    return tareas.filter((tarea) => tarea.estado === filtro);
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
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          type="text"
          placeholder="Añadir tarea..."
          ref={inputRef}
        />
        <button type="submit">Añadir tarea</button>
      </form>
    </>
  );
}
