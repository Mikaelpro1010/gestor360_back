import prismaClient from "../../prisma";

async function GetUsuariosService() {
  const usuarios = await prismaClient.user.findMany();
  return usuarios;
}

export { GetUsuariosService };
