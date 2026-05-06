import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthedRequest } from "../types/AuthRequestType";

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body; //Captura de datos
    if (!email || !password || !name) {
      res.status(400).json({
        error: "Faltan datos para el registro.",
      });
      return;
    }
    //Si hay datos validos, hasheo de password

    const hashedPassword = await bcrypt.hash(password, 10);

    //Crear nueva entrada
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    res.status(200).json({
      mensaje: "Usuario creado con éxito",
      userName: newUser.name,
      userId: newUser.id,
      userEmail: newUser.email,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al registrar usuario",
      raw: error,
    });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Revisar datos enviados
    if (!email || !password || (email || password) === undefined) {
      res.status(500).json({
        error: "Faltan datos para el login.",
      });
      return;
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user || user === undefined) {
      res.status(404).json({
        error: "User not found, cageface.",
      });
      return;
    }

    // Comprobar hash
    const decrypt = await bcrypt.compare(password, user.password);

    if (decrypt) {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        jwtSecret as string,
        {
          expiresIn: "5m",
        },
      );

      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      res.status(200).json({
        mensaje: `Bienvenido ${user.name}`,
        token: token,
        userData: safeUser,
      });
      return;
    } else {
      res.status(403).json({
        error: "No autorizado",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      error: "Error al autenticar.",
    });
  }
};

export const profile = async (req: AuthedRequest, res: Response) => {
  const userId = !req.params.id
    ? req.id
    : parseInt((req.params.id as string) || "0");
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!userData || userData === undefined) {
    res.status(404).json({
      error: "User not found.",
    });
    return;
  }
  res.status(200).json({
    userData: userData,
  });
  return;
};

export const refresh = async (req: AuthedRequest, res: Response) => {
  const authHeaders = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET;
  if (!authHeaders?.startsWith("Bearer")) {
    res.status(401).json({
      error: "No autorizado",
    });
    return;
  }

  const [, token] = authHeaders.split(" ");
  const payload = jwt.verify(token, jwtSecret as string, {
    ignoreExpiration: true,
  }) as JwtPayload;

  if (!payload || payload === undefined) {
    res.status(401).json({
      error: "No autorizado",
    });
    return;
  }

  const userData = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!userData) {
    res.status(404).json({
      error: "Usuario no encontrado",
    });
    return;
  }
  //Limpiar payload antiguo, conservar solo datos de usuario.
  const { exp, iat, nbf, jti, ...userPayload } = payload;
  const newToken = jwt.sign(userPayload, jwtSecret as string, {
    expiresIn: "5m",
  });

  res.status(200).json({
    mensaje: "Nuevo token generado.",
    token: newToken,
  });
};
