import { Request, Response } from "express";
import { GetUsuariosService } from "../../service/users/GetUsuariosService";

class GetUsuariosController {
  async handle(req: Request, res: Response) {
    try {
      const usuarios = await GetUsuariosService();
      return res.status(200).json(usuarios);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { GetUsuariosController };
