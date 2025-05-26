import { Request, Response } from "express";
import { UpdateUsuarioService } from "../../service/users/UpdateUsuarioService";

class UpdateUsuarioController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, cargoNaEmpresa } = req.body;

    try {
      const updatedUser = await UpdateUsuarioService({
        id,
        name,
        email,
        cargoNaEmpresa,
      });

      return res.status(200).json({
        message: "Usuário atualizado com sucesso",
        user: updatedUser,
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateUsuarioController };
