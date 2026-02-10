import useDebounce from "../hooks/useDebounce";
import { useState } from "react";

export default function Debouncer() {
  const [texto, setTexto] = useState("");
  const textoDebounced = useDebounce({ value: texto, delay: 500 });
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
