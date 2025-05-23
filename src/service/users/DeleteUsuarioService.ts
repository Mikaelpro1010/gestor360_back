import prismaClient from "../../prisma";

interface DeleteUsuarioRequest {
  id: string;
}

async function DeleteUsuarioService(request: DeleteUsuarioRequest) {
  const { id } = request;

  const user = await prismaClient.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  await prismaClient.user.delete({
    where: { id },
  });
}

export { DeleteUsuarioService };
