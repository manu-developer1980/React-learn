import React, { useState, useRef, useEffect } from "react";

interface InputEdicionProps {
  textoInicial: string;
  onGuardarEdicion: (nuevoTexto: string) => void;
}
export default function InputEdicion({
  textoInicial,
  onGuardarEdicion,
}: InputEdicionProps) {
  const [texto, setTexto] = useState(textoInicial);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onGuardarEdicion(texto);
    } else if (e.key === "Escape") {
      onGuardarEdicion(textoInicial);
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTexto(e.target.value)
        }
        value={texto}
        onBlur={() => onGuardarEdicion(texto)}
        ref={inputRef}
      />
    </div>
  );
}
