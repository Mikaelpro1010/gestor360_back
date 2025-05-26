import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { sendConfirmationEmail } from "../../service/users/ConfirmationEmailService";

class AprovedUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID do usuário não fornecido." });
    }

    try {
      const user = await prismaClient.user.update({
        where: { id: id },
        data: { status: "ATIVA" },
      });

      // Aqui você chama a função de envio de e-mail:
      await sendConfirmationEmail(user.email, user.name);

      return res.status(200).json({ message: "Usuário aprovado com sucesso!", user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao aprovar usuário." });
    }
  }
}

export { AprovedUserController };
