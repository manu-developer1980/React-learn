import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
export default function Header() {
  const { user, logout } = useAuth();
  useEffect(() => {
    console.log(user ? user : "Usuario no logeado");
  }, [user]);
  return (
    <>
      <header>
        <nav className="bg-white shadow p-4 bg-gray-100">
          <h1 className="text-xl font-bold">Auth Dashboard</h1>
          {user ? (
            <div className="flex gap-4 items-center">
              <span> Hola, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="..."
            >
              Iniciar Sesión
            </Link>
          )}
          <ul>
            <li>
              <a href="">Menu 1</a>
            </li>
            <li>
              <a href="">Menu 2</a>
            </li>
            <li>
              <a href="">Menu 3</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
