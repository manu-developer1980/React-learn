import { useEffect, useRef, useState } from "react";

export default function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    const itemGuardado = localStorage.getItem(clave);
    return itemGuardado ? JSON.parse(itemGuardado) : valorInicial;
  });

  useEffect(() => {
    localStorage.setItem(clave, JSON.stringify(valor));
  }, [clave, valor]);

  return [valor, setValor];
}
