import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Faltan datos" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    res.status(200).json({
      message: "Usuario creado",
      userId: user.id,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al registrar usuario. Revisa el email o nombre de usuario",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || (email || password) === undefined) {
      res.status(500).json({
        error: "Revisa los datos del formulario.",
      });
      return;
    }
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user || user === null) {
      res.status(404).json({
        error: "Usuario no encontrado",
      });
      return;
    } else {
      if (process.env.JWT_SECRET === undefined) {
        res.status(500).json({
          error: "Error en token",
        });
        return;
      }
      const decrypt = await bcrypt.compare(password, user.password);

      if (decrypt) {
        const token = jwt.sign(
          { userId: user.id, userName: user.name },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          },
        );
        res.status(200).json({
          mensaje: `Bienvenido ${user.name}`,
          token: token,
        });
      } else {
        res.status(401).json({
          error: "No autorizado.",
        });
        return;
      }
    }
  } catch (error) {
    res.status(500).json({
      error: "Error en login",
    });
    console.log(error);
  }
};

export const ping = (req: Request, res: Response) => {
  res.status(200).json({
    mensaje: "ok",
  });
};
