import {
  useEffect,
  useState,
  useRef,
  useContext,
  ReactEventHandler,
} from "react";
import { TareasContext } from "../context/TareasContext";
import useInput from "../hooks/useInput";

export default function ListaTareas() {
  const { tareas, agregarTarea, eliminarTarea, completarTarea } =
    useContext(TareasContext)!;

  const [filtro, setFiltro] = useState<string>("todas");

  const inputTarea = useInput("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAgregarTarea = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputTarea.value.trim()) return;
    agregarTarea(inputTarea.value);
    inputTarea.reset();
  };
  useEffect(() => {
    inputRef.current?.focus();
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
