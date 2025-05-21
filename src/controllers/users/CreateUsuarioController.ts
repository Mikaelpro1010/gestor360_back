import { Request, Response } from "express";
import prismaClient from "../../prisma";
import bcrypt from "bcryptjs";
import { userSchema } from "../../schemas/userSchema";

class CreateUsuarioController {
  async handle(req: Request, res: Response) {
    // Validação com zod
    const parsed = userSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors[0].message });
    }

    const {
      name,
      email,
      password,
      role,
      roleLevel,
      managerId,

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
    } = parsed.data;

    // Checa se o e-mail já existe
    const emailExists = await prismaClient.user.findUnique({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ error: "Este e-mail já está em uso." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
          roleLevel,
          managerId,

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
        },
      });

      return res.status(201).json({ message: "Usuário criado com sucesso!", user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar usuário." });
    }
  }
}

export { CreateUsuarioController };
