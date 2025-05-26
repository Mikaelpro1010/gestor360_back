import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { userSchema } from "../../schemas/userSchema";

interface UsuarioRequest {
  name: string;
  email: string;
  password: string;

  managerId?: string;

  status: string;

  cpf?: string;
  cep?: string;
  estado?: string;
  cidade?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  complemento?: string;

  cnpj?: string;
  nomeFantasia?: string;
  razaoSocial?: string;
  registroMunicipal?: string;
  registroEstadual?: string;
  empresaCep?: string;
  empresaEstado?: string;
  empresaCidade?: string;
  empresaRua?: string;
  empresaNumero?: string;
  empresaBairro?: string;
  empresaComplemento?: string;

  cargoNaEmpresa: string;
  nomeEmpresa?: string;
}

class CreateUsuarioService {
  async execute(data: UsuarioRequest) {
    // Validação com Zod
    const parsed = userSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(parsed.error.errors[0].message);
    }

    const {
      name,
      email,
      password,
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

    // Verifica se e-mail já existe
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    });
    if (userAlreadyExists) {
      throw new Error("Usuário já existe");
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        managerId,

        status: status ?? "PENDENTE",

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
        nomeEmpresa
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        roleLevel: true
      },
    });

    return user;
  }
}

export { CreateUsuarioService };
