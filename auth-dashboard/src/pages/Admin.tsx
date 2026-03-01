export default function Admin() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Panel de Administración
      </h1>
      <p>Solo visible para usuarios con rol 'admin'.</p>
    </div>
  );
}
