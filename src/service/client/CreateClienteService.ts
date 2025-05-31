import prismaClient from "../../prisma";
import { clientSchema } from "../../schemas/clientSchema";

interface ClienteRequest {
  userId: string;

  email: string;
  contato: string;
  cpf: string;
  rg?: string;
  sexo?: string;
  dataNascimento?: Date | string;

  endereco?: string;
  numero?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  estado?: string;

  situacao: string;
  origem: string;

  documentos: string[];

  anotacoes?: string;
}

class CreateClienteService {
  async execute(data: ClienteRequest) {
    // Validação com Zod
    const parsed = clientSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(parsed.error.errors[0].message);
    }

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
    } = parsed.data;

    // Verifica se o cliente já existe pelo CPF ou email
    const clientAlreadyExists = await prismaClient.client.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    });

    if (clientAlreadyExists) {
      throw new Error("Cliente já cadastrado com este e-mail ou CPF");
    }

    // Criação do cliente
    const client = await prismaClient.client.create({
      data: {
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
      },
      select: {
        id: true,
        email: true,
        cpf: true,
        contato: true,
        situacao: true,
        origem: true,
        createdAt: true,
      },
    });

    return client;
  }
}

export { CreateClienteService };
