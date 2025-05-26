import nodemailer from "nodemailer";
import 'dotenv/config';

export async function sendConfirmationEmail(email: string, name: string) {

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    // Validação das variáveis de ambiente
    if (!emailUser || !emailPass) {
        throw new Error("EMAIL_USER e EMAIL_PASS precisam estar configurados nas variáveis de ambiente.");
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // Coloque seu e-mail de envio
            pass: process.env.EMAIL_PASS, // Coloque a senha do e-mail
        },
    });

    await transporter.sendMail({
        from: "Equipe Gestor360",
        to: email,
        subject: "Cadastro Aprovado!",
        html: `<p>Olá, <strong>${name}</strong>!</p>

        <p>Seu cadastro na <strong>Gestor360</strong> foi aprovado com sucesso.</p>

        <p>Se tiver qualquer dúvida, nossa equipe de suporte está à disposição.</p>

        <p>Bem-vindo à <strong>Gestor360</strong>!</p>`,
    });
}
