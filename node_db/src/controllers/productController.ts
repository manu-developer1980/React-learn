import { Request, Response } from "express";
import { ProductsType } from "../types/productType.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  /* if (req.query.name) {
    const nameToSearch = req.query.name.toString().toLowerCase();
    // 2. Filtramos
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(nameToSearch),
    );

    // 3. Devolvemos resultado filtrado
    
    res.json(filteredProducts);
    return; // 🛑 IMPORTANTE: Para aquí la ejecución
  }*/

  res.json(products);
};

export const addProducts = async (req: Request, res: Response) => {
  const nuevoProducto: ProductsType = req.body;

  await prisma.product.create({
    data: {
      name: req.body.name,
      price: parseFloat(req.body.price),
      type: req.body.type,
    },
  });

  res.status(201).json({
    mensaje: "Producto añadido",
    producto: nuevoProducto,
  });
};

export const findProduct = async (req: Request, res: Response) => {
  const id = parseInt((req.params.id as string) || "0");
  const productFound = await prisma.product.findUnique({
    where: { id: id },
  });

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

export const updateProd = async (req: Request, res: Response) => {
  const idBuscado = parseInt((req.params.id as string) || "0");
  const updatedProd = await prisma.product.update({
    data: req.body,
    where: { id: idBuscado },
  });

  res.status(200).json({
    mensaje: "Actualizacion correcta",
    updatedProducts: updatedProd,
  });
};
export const deleteProd = async (req: Request, res: Response) => {
  const idBuscado = parseInt((req.params.id as string) || "0");
  await prisma.product.delete({
    where: { id: idBuscado },
  });

  res.status(200).json({
    mensaje: "Producto eliminado",
    updatedProducts: await prisma.product.findMany(),
  });
};

export const addBatchProducts = async (res: Response, req: Request) => {
  try {
    const count = await prisma.product.createMany({
      data: req.body,
      skipDuplicates: true,
    });

    res.json({ message: `${count.count} productos creados` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
