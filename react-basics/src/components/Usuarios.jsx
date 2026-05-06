import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function Usuarios() {
  const {
    data: usuarios,
    loading: carga,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  return (
    <>
      <h3>Usuarios</h3>
      <ul className="usuarios">
        {carga ? (
          <LoadingSpinner />
        ) : (
          usuarios &&
          usuarios.map((usuario) => (
            <li>
              <Link to={`/usuario/${usuario.id}`}>
                <span>{usuario.name}</span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
