import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import bcrypt from "bcryptjs";

class AuthUserService {
  async execute({ email, password }: { email: string; password: string }) {
    // Validação básica dos inputs
    if (!email || !password) {
      throw new Error("Credenciais inválidas");
    }

    // Verificação crítica do JWT_SECRET
    if (!process.env.JWT_SECRET) {
      throw new Error("Configuração do servidor incompleta");
    }

    try {
      // Busca o usuário com campos essenciais
      const user = await prismaClient.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          role: true,
          status: true
        }
      });

      if (!user) {
        throw new Error("Credenciais inválidas"); // Mensagem genérica por segurança
      }

      // Verificação de status
      if (user.status !== 'ATIVA') {
        throw new Error("Conta não ativada. Por favor, aguarde a aprovação.");
      }

      // Verificação de senha com tempo constante
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Credenciais inválidas");
      }

      // Geração do token seguro
      const token = sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          subject: user.id,
          expiresIn: "7d",
          algorithm: "HS256"
        }
      );

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status
        }
      };

    } catch (error) {
      console.error("Erro no serviço de autenticação:", error);
      throw new Error("Falha na autenticação");
    }
  }
}

export { AuthUserService };