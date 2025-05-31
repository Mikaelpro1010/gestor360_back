import prismaClient from "../../prisma";

async function GetClientesService() {
  const clientes = await prismaClient.client.findMany();
  return clientes;
}

export { GetClientesService };
