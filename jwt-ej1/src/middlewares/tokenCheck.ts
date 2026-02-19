import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { AuthedRequest } from "../types/AuthRequestType.js";

export const tokenCheck = (
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
  }
  //Try catch para extraer el payload usando el token
  try {
    //Verificamos.

    const payload = jwt.verify(token, jwtSecret) as JwtPayload;

    //Sacamos los valores que nos interesan del payload.
    req.userId = payload.userId;
    req.userName = payload.userName;
    req.userEmail = payload.userEmail;
    req.userRole = payload.userRole;
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
