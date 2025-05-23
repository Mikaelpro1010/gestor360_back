// src/services/users/PasswordRecoveryServer.ts
import prismaClient from "../../prisma";
import nodemailer from "nodemailer";

interface PedidoRecuperacaoSenha {
  email: string;
}

class PasswordRecoveryService{
  async execute({ email }: PedidoRecuperacaoSenha) {
    const usuario = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    // Gerar um código de verificação de 6 dígitos
    const codigoVerificacao = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Armazenar o código de verificação e a data de expiração no banco de dados
    await prismaClient.user.update({
      where: { email },
      data: {
        verificationCode: codigoVerificacao,
        codeExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // expira em 10 minutos
      },
    });

    // Configurar o serviço de e-mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Coloque seu e-mail de envio
        pass: process.env.EMAIL_PASS, // Coloque a senha do e-mail
      },
    });

    // Enviar o e-mail com o código de verificação
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: usuario.email,
      subject: "Código de Verificação para Redefinição de Senha",
      text: `Seu código de verificação é: ${codigoVerificacao}. Ele é válido por 10 minutos.`,
    });

    return { message: "Código de verificação enviado para o e-mail." };
  }
}

export { PasswordRecoveryService };
