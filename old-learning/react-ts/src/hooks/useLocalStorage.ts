import { useEffect, useState } from "react";

export default function useLocalStorage<T>(clave: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const itemGuardado = localStorage.getItem(clave);
      return itemGuardado ? JSON.parse(itemGuardado) : valorInicial;
    } catch (error) {
      console.log(error);
      return valorInicial;
    }
  });

  useEffect(() => {
    localStorage.setItem(clave, JSON.stringify(valor));
  }, [clave, valor]);

  return [valor, setValor] as const;
}
