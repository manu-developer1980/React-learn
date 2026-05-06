import React, { useState, useRef, useEffect } from "react";

export default function InputEdicion({ textoInicial, onGuardarEdicion }) {
  const [texto, setTexto] = useState(textoInicial);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <input
        onChange={(e) => setTexto(e.target.value)}
        value={texto}
        onBlur={() => onGuardarEdicion(texto)}
        ref={inputRef}
      />
    </div>
  );
}
