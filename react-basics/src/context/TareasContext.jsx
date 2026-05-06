import { createContext, useEffect, useState } from "react";
export const TareasContext = createContext();

export function TareasProvider({ children }) {
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem("misTareasContext");
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  useEffect(() => {
    localStorage.setItem("misTareasContext", JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = (texto) => {
    const nuevaTarea = {
      id: Date.now(),
      texto,
      estado: "incompleta",
      modo: "lectura",
    };

    setTareas([...tareas, nuevaTarea]);
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id != id));
  };

  const completarTarea = (id) => {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, estado: "completa" } : t)),
    );
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t)),
    );
  };

  const activarEdicion = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id
          ? { ...t, modo: t.modo === "lectura" ? "edicion" : "lectura" }
          : t,
      ),
    );
  };

  const guardarEdicion = (id, nuevoTexto) => {
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
      }}>
      {children}
    </TareasContext.Provider>
  );
}
