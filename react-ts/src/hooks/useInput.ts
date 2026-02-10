import { ReactElement, ReactEventHandler, useState } from "react";

export default function useInput(valorInicial: string) {
  const [valor, setValor] = useState(valorInicial);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValor(e.target.value);
  };
  return {
    value: valor,
    onChange: handleChange,
    reset: () => setValor(""),
  };
}
