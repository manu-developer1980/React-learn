import Contador from "./components/Contador";
import ListaTareas from "./components/ListaTareas";
import Kanban from "./components/Kanban";
import ListaVIP from "./components/listaVIP";
import Saludo from "./components/Saludo";
import Usuarios from "./components/Usuarios";
import Debouncer from "./components/Debouncer";
import Card from "./components/Card";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import UsuarioDetalle from "./components/UsuarioDetalle";

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ListaTareas />
              <Usuarios />
            </>
          }
        />

        <Route
          path="/kanban"
          element={
            <>
              <Kanban />
            </>
          }
        />

        <Route
          path="/vip"
          element={<ListaVIP />}
        />

        <Route
          path="/contador"
          element={<Contador />}
        />

        <Route
          path="/debouncer"
          element={<Debouncer />}
        />
        <Route
          path="/usuario/:id"
          element={<UsuarioDetalle />}
        />

        <Route
          path="/usuarios"
          element={<Usuarios />}
        />
        <Route
          path="*"
          element={<h2>404 - Página no encontrada 😵</h2>}
        />
      </Routes>
    </Layout>
  );
}

export default App;
