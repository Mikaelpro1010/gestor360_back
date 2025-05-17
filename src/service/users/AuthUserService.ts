import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import bcrypt from "bcryptjs";

class AuthUserService {
  async execute({ email, password }: { email: string; password: string }) {
    // Busca o usuário no banco de dados
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    // Verifica a senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Senha incorreta!");
    }

    // Gera o token com a role do usuário
    const token = sign(
      {
        name: user.name,
        email: user.email,
        role: user.role, 
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: "7d",
      }
    );

    // ✅ INCLUIR ROLE NO RETORNO DA AUTENTICAÇÃO
    return { id: user.id, name: user.name, email: user.email, role: user.role, token };
  }
}

export { AuthUserService };