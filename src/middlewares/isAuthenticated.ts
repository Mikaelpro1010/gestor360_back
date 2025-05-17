import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

// Interface estendida para incluir as propriedades do token JWT
interface Payload extends JwtPayload {
  sub: string; // ID do usuário
  role: string; // Papel do usuário (admin, user, etc.)
}

// Adiciona tipos personalizados ao objeto Request do Express
declare module "express-serve-static-core" {
  interface Request {
    user_id?: string; // ID do usuário autenticado
    user_role?: string; // Papel do usuário autenticado
  }
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  // Verifica se o token foi enviado no cabeçalho
  if (!authToken) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  // Extrai o token (formato: "Bearer <token>")
  const [, token] = authToken.split(" ");

  try {
    // Verifica se a chave secreta do JWT está configurada
    if (!process.env.JWT_SECRET) {
      throw new Error("Chave JWT não configurada no servidor");
    }

    // Verifica e decodifica o token
    const decoded = verify(token, process.env.JWT_SECRET);

    // Verificação adicional para garantir que o token tem a estrutura correta
    if (typeof decoded === 'string' || !decoded.sub || !decoded.role) {
      return res.status(401).json({ error: "Token inválido: estrutura incorreta." });
    }

    // Faz a tipagem segura do token decodificado
    const decodedToken = decoded as Payload;

    // Adiciona as informações do usuário à requisição
    req.user_id = decodedToken.sub;
    req.user_role = decodedToken.role;

    return next();
  } catch (err) {
    // Tratamento de erros específicos
    if (err instanceof Error) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expirado." });
      }
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Token inválido." });
      }
      if (err.message === "Chave JWT não configurada no servidor") {
        return res.status(500).json({ error: "Erro de configuração do servidor." });
      }
    }
    return res.status(401).json({ error: "Falha na autenticação." });
  }
}