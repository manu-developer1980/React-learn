import { useState, useEffect } from "react";

export default function useDebounce(texto = "", delay = 500) {
  const [textoDebounced, setTextoDebounced] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setTextoDebounced(texto);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [texto]);

  return textoDebounced;
}
