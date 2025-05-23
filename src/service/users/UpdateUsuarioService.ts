import prismaClient from "../../prisma";
import { userSchema } from "../../schemas/userSchema";
import { hash } from "bcryptjs";

interface UpdateUsuarioRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  roleLevel?: number;
  managerId?: number;
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
  cargoNaEmpresa?: string;
  nomeEmpresa?: string;
}

async function UpdateUsuarioService(request: UpdateUsuarioRequest) {
  const { id, email, password, ...rest } = request;

  const parsed = userSchema.partial().safeParse(rest);
  if (!parsed.success) {
    const msg = parsed.error.errors[0].message;
    throw new Error(msg);
  }
  const data: Record<string, any> = parsed.data;

  const user = await prismaClient.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  if (email && email !== user.email) {
    const conflict = await prismaClient.user.findFirst({ where: { email } });
    if (conflict) {
      throw new Error("Email já em uso");
    }
    data.email = email;
  }

  if (password) {
    data.password = await hash(password, 8);
  }

  const updatedUser = await prismaClient.user.update({
    where: { id },
    data,
  });

  return updatedUser;
}

export { UpdateUsuarioService };
