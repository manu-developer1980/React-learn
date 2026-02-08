import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

export default function ({ children }) {
  const { user, login, logout } = useContext(AuthContext);
  return (
    <div className="layout">
      <header>
        {user ? (
          <>
            Hola, {user} <button onClick={() => logout()}>Salir</button>
          </>
        ) : (
          <>
            Hola invitado. <button onClick={() => login("Manu")}>Entrar</button>
          </>
        )}
        <nav>
          <NavLink
            to="/"
            end>
            Inicio
          </NavLink>
          <NavLink to="/kanban">Kanban</NavLink>
          <NavLink to="/vip">Lista VIP</NavLink>
          <NavLink to="/contador">Contador</NavLink>
          <NavLink to="/debouncer">Debouncer</NavLink>
        </nav>
      </header>
      <main className="contenido-principal">
        {children} {/* <--- Aquí se inyectará tu App actual */}
      </main>
      <footer>© 2024 Manqui Dev (Footer Fijo)</footer>
    </div>
  );
}
