export type EstadoTarea = "incompleta" | "iniciada" | "completa";
export type ModoTarea = "edicion" | "lectura";

export interface Tarea {
  id: number;
  texto: string;
  estado: EstadoTarea;
  modo: ModoTarea;
}

export interface TareaContextType {
  tareas: Tarea[];
  agregarTarea: (texto: string) => void;
  eliminarTarea: (id: number) => void;
  completarTarea: (id: number) => void;
  cambiarEstado: (id: number, nuevoEstado: EstadoTarea) => void;
  activarEdicion: (id: number) => void;
  guardarEdicion: (id: number, nuevoTexto: string) => void;
}
