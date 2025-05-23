import { Request, Response } from 'express';
import { PasswordResetService } from '../../service/users/PasswordResetService';

class PasswordResetServiceController {
  async handle(req: Request, res: Response) {
    const { email, codigoVerificacao, novaSenha } = req.body;
    const passwordResetService = new PasswordResetService();

    try {
      const response = await passwordResetService.execute({
        email,
        codigoVerificacao,
        novaSenha
      });
      res.json(response);
    } catch (error) {
      // Tratamento seguro do erro
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro desconhecido durante a redefinição de senha' });
      }
    }
  }
}

export { PasswordResetServiceController };