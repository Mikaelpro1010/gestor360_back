import { Request, Response } from "express";
import { UpdateUsuarioService } from "../../service/users/UpdateUsuarioService";

class UpdateUsuarioController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      cpf,
      cep,
      estado,
      cidade,
      rua,
      numero,
      bairro,
      complemento,
      cnpj,
      nomeFantasia,
      razaoSocial,
      registroMunicipal,
      registroEstadual,
      empresaCep,
      empresaEstado,
      empresaCidade,
      empresaRua,
      empresaNumero,
      empresaBairro,
      empresaComplemento,
      cargoNaEmpresa,
      nomeEmpresa,
    } = req.body;

    try {
      const updatedUser = await UpdateUsuarioService({
        id,
        name,
        email,
        password,
        cpf,
        cep,
        estado,
        cidade,
        rua,
        numero,
        bairro,
        complemento,
        cnpj,
        nomeFantasia,
        razaoSocial,
        registroMunicipal,
        registroEstadual,
        empresaCep,
        empresaEstado,
        empresaCidade,
        empresaRua,
        empresaNumero,
        empresaBairro,
        empresaComplemento,
        cargoNaEmpresa,
        nomeEmpresa,
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
