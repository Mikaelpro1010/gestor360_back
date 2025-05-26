import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  role: string;
  status: string;
}

export function isAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token não fornecido." });
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (decoded.role !== "admin") {
      res.status(403).json({ error: "Apenas administradores podem confirmar cadastro de usuário." });
      return;
    }

    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido." });
  }
}
