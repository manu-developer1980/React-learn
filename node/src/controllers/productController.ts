import { Request, Response } from "express";
import { ProductsType } from "../types/productType.js";

let products: ProductsType[] = [
  { id: 1, name: "Telescopio Celestron EdgeHD 8", price: 1400, type: "OTA" },
  {
    id: 2,
    name: "Cámara ZWO ASI2600MM Pro",
    price: 2500,
    type: "Cámara Dedicada",
  },
  {
    id: 3,
    name: "Montura Sky-Watcher EQ6-R Pro",
    price: 1650,
    type: "Montura Ecuatorial",
  },
  {
    id: 4,
    name: 'Filtro Optolong L-Ultimate 2"',
    price: 320,
    type: "Filtro Banda Estrecha",
  },
  { id: 5, name: "Guiado ZWO ASI120MM Mini", price: 160, type: "Cámara Guía" },
];
export const getProducts = (req: Request, res: Response) => {
  if (req.query.name) {
    const nameToSearch = req.query.name.toString().toLowerCase();

    // 2. Filtramos
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(nameToSearch),
    );

    // 3. Devolvemos resultado filtrado
    res.json(filteredProducts);
    return; // 🛑 IMPORTANTE: Para aquí la ejecución
  }
  res.json(products);
};

export const addProducts = (req: Request, res: Response) => {
  const nuevoProducto: ProductsType = req.body;

  products = [...products, nuevoProducto];
  res.status(201).json({
    mensaje: "Producto añadido",
    producto: nuevoProducto,
    productos_actuales: products,
  });
};

export const findProduct = (req: Request, res: Response) => {
  const id = parseInt((req.params.id as string) || "0");
  console.log(id);

  const productFound = products.find((product) => product.id === id);

  if (productFound) {
    res.status(201).json({
      mensaje: "Producto encontrado.",
      code: "found",
      data: productFound,
    });
  } else {
    res.status(404).json({
      mensaje: "Producto no encontrado",
      code: "notFound",
    });
  }
};

export const updateProd = (req: Request, res: Response) => {
  const idBuscado = parseInt((req.params.id as string) || "0");

  products = products.map((product) =>
    product.id === idBuscado ? { ...product, ...req.body } : product,
  );

  res.status(200).json({
    mensaje: "Actualizacion correcta",
    updatedProducts: products,
  });
};

export const deleteProd = (req: Request, res: Response) => {
  const idBuscado = parseInt((req.params.id as string) || "0");

  products = products.filter((product) => product.id !== idBuscado);

  res.status(200).json({
    mensaje: "Producto eliminado",
    updatedProducts: products,
  });
};
