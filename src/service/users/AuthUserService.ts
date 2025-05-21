import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import bcrypt from "bcryptjs";

class AuthUserService {
  async execute({ email, password }: { email: string; password: string }) {
    // Verificação do JWT_SECRET
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não está definido nas variáveis de ambiente");
    }

    // Busca o usuário
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    // Verificação de senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Senha incorreta!");
    }

    // Preparação do payload
    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.id
    };

    // Opções do token
    const options = {
      subject: user.id,
      expiresIn: "7d"
    };

    // Geração do token (com tipagem segura)
    const token = sign(
      payload,
      process.env.JWT_SECRET,
      options
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}

export { AuthUserService };