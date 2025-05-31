import { Request, Response } from "express";
import { GetClientesService } from "../../service/client/GetClientesService";

class GetClientesController {
  async handle(req: Request, res: Response) {
    try {
      const clientes = await GetClientesService();
      return res.json(clientes);
    } catch (err: any) {
      return res.status(500).json({ error: "Erro ao buscar clientes." });
    }
  }
}

export { GetClientesController };
