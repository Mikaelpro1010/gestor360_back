import { Request, Response } from "express";
import { DeleteUsuarioService } from "../../service/users/DeleteUsuarioService";

class DeleteUsuarioController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await DeleteUsuarioService({ id });
      return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { DeleteUsuarioController };
