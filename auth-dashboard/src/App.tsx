import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="admin"
            element={<Admin />}
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
