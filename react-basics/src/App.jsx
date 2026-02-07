import Contador from "./components/Contador";
import ListaTareas from "./components/ListaTareas";
import Kanban from "./components/Kanban";
import ListaVIP from "./components/listaVIP";
import Saludo from "./components/Saludo";
import Usuarios from "./components/Usuarios";
import Debouncer from "./components/Debouncer";
import Card from "./components/Card";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <div>
        <ListaTareas />
        <Usuarios />
      </div>

      <Kanban />

      <Contador />
      <Debouncer />
      <section id="cardContainer">
        <Card>
          <h2>Tarjeta!</h2>
          <p>Tarjeta usando "children"</p>
        </Card>
        <Card>
          <button>Boton Children!</button>
        </Card>
      </section>
    </Layout>
  );
}

export default App;
