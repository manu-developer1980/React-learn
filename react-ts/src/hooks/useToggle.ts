import { useState } from "react";

export default function useToggle(valorInicial: boolean = false) {
  const [visible, setVisible] = useState<boolean>(valorInicial);

  const toggle = () => {
    setVisible(!visible);
  };

  return [visible, toggle] as const;
}
