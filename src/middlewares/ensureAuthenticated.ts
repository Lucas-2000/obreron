import { NextFunction, Request, Response } from "express";
import { jwtSecret } from "../infra/config/jwtConfig";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  sub: string;
  exp: number;
}

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function ensureAuthenticated(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) return res.status(401).json({ error: "Sem autorização" });

  const [, token] = authToken.split(" ");

  if (!jwtSecret)
    return res.status(401).json({ error: "JWT Key não encontrada!" });

  try {
    const decodedToken: TokenPayload = verify(token, jwtSecret) as TokenPayload;

    if (decodedToken.exp * 1000 < Date.now()) {
      return res
        .status(401)
        .json({ error: "Token expirado. Faça o login novamente." });
    }

    req.userId = decodedToken.sub;

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Token inválido. Faça o login novamente." });
  }
}
