import { Request, Response } from "express";
import { CreateClienteService } from "../../service/client/CreateClienteService";

class CreateClienteController {
  async handle(req: Request, res: Response) {
    try {
      const {
        userId,
        email,
        contato,
        cpf,
        rg,
        sexo,
        dataNascimento,
        endereco,
        numero,
        bairro,
        cep,
        cidade,
        estado,
        situacao,
        origem,
        documentos,
        anotacoes,
      } = req.body;

      const createClienteService = new CreateClienteService();

      const cliente = await createClienteService.execute({
        userId,
        email,
        contato,
        cpf,
        rg,
        sexo,
        dataNascimento,
        endereco,
        numero,
        bairro,
        cep,
        cidade,
        estado,
        situacao,
        origem,
        documentos,
        anotacoes,
      });

      return res.status(201).json(cliente);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { CreateClienteController };
