import { createContext, useEffect, useState, ReactNode } from "react";
import { TareaContextType, Tarea, EstadoTarea } from "../types/tarea";

export const TareasContext = createContext<TareaContextType | null>(null);

export function TareasProvider({ children }: { children: ReactNode }) {
  const [tareas, setTareas] = useState<Tarea[]>(() => {
    const tareasGuardadas = localStorage.getItem("misTareasContext");
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  useEffect(() => {
    localStorage.setItem("misTareasContext", JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = (texto: string) => {
    const nuevaTarea: Tarea = {
      id: Date.now(),
      texto,
      estado: "incompleta",
      modo: "lectura",
    };

    setTareas([...tareas, nuevaTarea]);
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  const completarTarea = (id: number) => {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, estado: "completa" } : t)),
    );
  };

  const cambiarEstado = (id: number, nuevoEstado: EstadoTarea) => {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t)),
    );
  };

  const activarEdicion = (id: number) => {
    setTareas(
      tareas.map((t) =>
        t.id === id
          ? { ...t, modo: t.modo === "lectura" ? "edicion" : "lectura" }
          : t,
      ),
    );
  };

  const guardarEdicion = (id: number, nuevoTexto: string) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, texto: nuevoTexto, modo: "lectura" } : t,
      ),
    );
  };

  return (
    <TareasContext.Provider
      value={{
        tareas,
        agregarTarea,
        eliminarTarea,
        completarTarea,
        activarEdicion,
        guardarEdicion,
        cambiarEstado,
      }}
    >
      {children}
    </TareasContext.Provider>
  );
}
