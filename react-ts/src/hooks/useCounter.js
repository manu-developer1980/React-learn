import React from "react";
import { useState } from "react";

export default function useCounter() {
  const [contador, setContador] = useState(0);

  const aumentar = () => {
    setContador(contador + 1);
  };

  const restar = () => {
    if (contador > 0) {
      setContador(contador - 1);
    } else {
      setContador(contador - 0);
    }
  };

  const reset = () => {
    setContador(0);
  };
  return { contador, aumentar, restar, reset };
}
