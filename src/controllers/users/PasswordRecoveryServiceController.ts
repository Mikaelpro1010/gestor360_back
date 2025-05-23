import { Request, Response } from 'express';
import { PasswordRecoveryService } from '../../service/users/PasswordRecoveryService';

class PasswordRecoveryServiceController {
  async handle(req: Request, res: Response) {
    const { email } = req.body;
    const passwordRecoveryService = new PasswordRecoveryService();

    try {
      const response = await passwordRecoveryService.execute({ email });
      res.json(response);
    } catch (error) {
      // Verificação segura do tipo do erro
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Ocorreu um erro desconhecido' });
      }
    }
  }
}

export { PasswordRecoveryServiceController };