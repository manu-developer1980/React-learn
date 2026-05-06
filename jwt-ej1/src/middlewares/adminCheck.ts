import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { AuthedRequest } from "../types/AuthRequestType";

export const adminCheck = (
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) => {
  // Obtenemos headers de authorization
  const authRequest = req.headers.authorization;

  // Comprobaciones iniciales
  if (
    !authRequest ||
    authRequest === undefined ||
    !authRequest?.startsWith("Bearer ")
  ) {
    res.status(401).json({
      error: "Token not found",
    });
    return;
  }
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret || jwtSecret === undefined) {
    res.status(401).json({
      error: "Error en JWT Secret",
    });
    return;
  }
  // Separamos Bearer del valor del token
  const [, token] = authRequest.split(" ");

  if (!token || token === undefined) {
    res.status(401).json({
      error: "No permitido",
    });
    return;
  }
  //Try catch para extraer el payload usando el token
  try {
    //Verificamos.

    const payload = jwt.verify(token, jwtSecret) as JwtPayload;
    //Sacamos los valores que nos interesan del payload.
    req.id = payload.id;
    req.name = payload.name;
    req.email = payload.email;
    req.role = payload.role;
    if (payload.role !== "admin") {
      res.status(403).json({
        error: `No tienes privilegios para esta accion.`,
      });
      return;
    }
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        error: "Token expirado",
      });
      return;
    }
    res.status(401).json({
      error: "No autorizado",
    });
  }
};
