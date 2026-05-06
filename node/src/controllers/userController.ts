import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  res.json([
    { id: 1, name: "Manu" },
    { id: 2, name: "Juan" },
  ]);
};

export const createUser = (req: Request, res: Response) => {
  const newUser = req.body;
  console.log("Creando nuevo usuario...", newUser);

  res.status(201).json({
    mensaje: "Usuario creado",
    user: newUser,
  });
};
