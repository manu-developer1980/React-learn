import React, { useEffect, useState } from "react";

export default function useWindowSize() {
  const [ancho, setAncho] = useState(window.innerWidth);
  const [alto, setAlto] = useState(window.innerHeight);

  useEffect(() => {
    const actualizarTamaño = () => {
      setAlto(window.innerHeight);
      setAncho(window.innerWidth);
    };

    window.addEventListener("resize", actualizarTamaño);

    return () => {
      window.removeEventListener("resize", actualizarTamaño);
    };
  }, []);

  return [alto, ancho];
}
