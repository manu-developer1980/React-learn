import { useState, useEffect } from "react";
import useCounter from "../hooks/useCounter";

export default function Contador() {
  const { contador, aumentar, restar, reset } = useCounter();
  return (
    <>
      <h3>{contador}</h3>
      <button onClick={aumentar}>+ </button>
      <button onClick={restar}>-</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}
