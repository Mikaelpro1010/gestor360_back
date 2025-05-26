import prisma from '../src/prisma';  // Ajuste conforme seu caminho
import { hash } from 'bcryptjs';

interface AdminUser {
  name: string;
  email: string;
  password: string;
  role: string;
  roleLevel: number;
  status: string;
  cargoNaEmpresa: string;
}

async function main(): Promise<void> {
  const adminEmail: string = process.env.ADMIN_EMAIL!;
  const adminPassword: string = process.env.ADMIN_PASSWORD!;

  const hashedPassword: string = await hash(adminPassword, 10);

  const admin: AdminUser = {
    name: "Administrador",
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
    roleLevel: 1,
    status: "ATIVA",
    cargoNaEmpresa: "Administrador"
  };

  const createdAdmin = await prisma.user.upsert({
    where: { email: admin.email },
    update: {},  // se já existe, não atualiza
    create: admin
  });

  console.log(`✅ Admin criado ou já existente: ${createdAdmin.email}`);
}

main()
  .catch((e: unknown) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
