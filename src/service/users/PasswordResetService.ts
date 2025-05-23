// src/services/users/ServicoRedefinicaoSenha.ts
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface PedidoRedefinicaoSenha {
  email: string;
  codigoVerificacao: string;
  novaSenha: string;
}

class PasswordResetService {
  async execute({ email, codigoVerificacao, novaSenha }: PedidoRedefinicaoSenha) {
    // Buscar o usuário pelo email
    const usuario = await prismaClient.user.findUnique({
      where: { email }
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    // Verificar se o código de verificação é válido e não expirou
    if (usuario.verificationCode !== codigoVerificacao || usuario.codeExpiresAt < new Date()) {
      throw new Error("Código de verificação inválido ou expirado");
    }

    // Criptografar a nova senha
    const senhaHash = await hash(novaSenha, 8);

    // Atualizar a senha e limpar o código de verificação
    await prismaClient.user.update({
      where: { email },
      data: {
        password: senhaHash,
        verificationCode: null, // Remove o código de verificação
        codeExpiresAt: null // Remove a data de expiração
      }
    });

    return { message: "Senha atualizada com sucesso" };
  }
}

export { PasswordResetService };
