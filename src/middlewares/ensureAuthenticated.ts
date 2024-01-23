import { NextFunction, Request, Response } from "express";
import { jwtSecret } from "../infra/config/jwtConfig";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) return res.status(401).json({ error: "Sem autorização" });

  const [, token] = authToken.split(" ");

  if (!jwtSecret)
    return res.status(401).json({ error: "JWT Key não encontrada!" });

  try {
    verify(token, jwtSecret);

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
