import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ProtectedRoutes from "./components/Layout/ProtectedRoutes";
import AdminProtectedRoutes from "./components/Layout/AdminProtectedRoutes";

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
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoutes>
                <Admin />
              </AdminProtectedRoutes>
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
