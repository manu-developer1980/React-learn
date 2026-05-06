import { useState, useEffect } from "react";

interface DebouncerProps {
  value: string;
  delay: number;
}
export default function useDebounce({ value, delay }: DebouncerProps) {
  const [textoDebounced, setTextoDebounced] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setTextoDebounced(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return textoDebounced;
}
