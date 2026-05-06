import { useState } from "react";

export default function useInput(valorInicial) {
  const [valor, setValor] = useState(valorInicial);

  const handleChange = (e) => {
    setValor(e.target.value);
  };
  return {
    value: valor,
    onChange: handleChange,
    reset: () => setValor(""),
  };
}
