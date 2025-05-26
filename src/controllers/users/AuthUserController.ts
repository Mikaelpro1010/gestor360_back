import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AuthUserService } from '../../service/users/AuthUserService';

class AuthUserController {
  handle: RequestHandler = async (req, res, next) => {
    try {
      const { email, password, status } = req.body;
      const authUserService = new AuthUserService();

      if(status && status !== 'ATIVA') {
        return res.status(403).json({ error: 'Usuário com cadastro pendente.' });
      }

      const auth = await authUserService.execute({ email, password });

      return res.json(auth) as any; // Usando 'as any' para evitar o erro de tipo
    } catch (error) {
      next(error);
    }
  };
}

export { AuthUserController };