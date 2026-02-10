interface SaludoProps {
  nombre: string;
  edad: number;
}

export default function Saludo({ nombre, edad }: SaludoProps) {
  return (
    <>
      <h2>Hola, soy {nombre}!</h2>
      {edad && <p>Tengo {edad} años</p>}
    </>
  );
}
