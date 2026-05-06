import React from "react";
import { useState } from "react";

export default function useToggle(valorInicial = false, cambiar) {
  const [visible, setVisible] = useState(valorInicial);

  const toggle = () => {
    setVisible(!visible);
  };

  return [visible, toggle];
}
