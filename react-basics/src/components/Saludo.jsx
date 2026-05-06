import React from "react";

export default function Saludo({ nombre, edad }) {
  return (
    <>
      <h2>Hola, soy {nombre}!</h2>
      {edad && <p>Tengo {edad} años</p>}
    </>
  );
}
