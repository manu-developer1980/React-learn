import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());

// Rutas

// GET
app.get("/", (req, res) => {
  res.send("Hola Mundo desde Express!🚂");
});

// POST
app.use("/api/usuarios", userRoutes);
app.use("/api/productos", productRoutes);

// Fin de Rutas
app.listen(port, () => {
  console.log(`Servidor de Express ejecutándose en http://localhost:${port}`);
});
