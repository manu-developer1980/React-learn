import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

export const Auth = (req: Request, res: Response, next: NextFunction) => {
  const authRequest = req.headers.authorization;

  if (!authRequest) {
    res.status(401).json({
      error: "Token not found",
    });
    return;
  }

  if (!authRequest?.startsWith("Bearer ")) {
    res.status(401).json({
      error: "Token not found",
    });
    return;
  }

  if (process.env.JWT_SECRET === undefined) {
    res.status(500).json({
      error: "Error en token.",
    });
    return;
  }

  const jwtSecret: string = process.env.JWT_SECRET;
  const [, token] = authRequest.split(" ");

  if (!token) {
    res.status(401).json({
      error: "No permitido",
    });
    return;
  }
  try {
    const payload = jwt.verify(token, jwtSecret as string) as JwtPayload;
    (req as any).userId = payload.userId;
    next();
  } catch (error) {
    res.status(401).json({
      error: "Error en token de autorizacion",
    });
    return;
  }
};
