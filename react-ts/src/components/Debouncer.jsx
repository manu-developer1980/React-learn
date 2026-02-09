import React, { useEffect, useRef, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export default function Debouncer() {
  const [texto, setTexto] = useState("");
  const textoDebounced = useDebounce(texto, 500);
  return (
    <>
      <input
        type="text"
        value={texto}
        placeholder="Texto incial"
        onChange={(e) => setTexto(e.target.value)}
      />
      <input
        type="text"
        value={textoDebounced}
        placeholder="Texto debounced"
        readOnly
      />
    </>
  );
}
