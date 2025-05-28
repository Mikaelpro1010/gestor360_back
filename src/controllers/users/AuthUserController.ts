import { Request, Response, NextFunction } from 'express';
import { AuthUserService } from '../../service/users/AuthUserService';

class AuthUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const authUserService = new AuthUserService();

      const auth = await authUserService.execute({ email, password });

      return res.json({
        success: true,
        ...auth
      });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Unexpected error',
      });
    }
  }
}


export { AuthUserController };