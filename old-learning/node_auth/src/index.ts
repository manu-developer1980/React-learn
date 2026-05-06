import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import "dotenv/config";
const app = express();
const port = 3000;

app.use(express.json());

// Rutas

app.use("/api/usuarios", userRoutes);
app.use("/api/productos", productRoutes);
app.use("/api/auth", authRoutes);

// Fin de Rutas
app.listen(port, () => {
  console.log(`Servidor de Express ejecutándose en http://localhost:${port}`);
});
