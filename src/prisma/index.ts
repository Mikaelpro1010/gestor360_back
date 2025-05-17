// src/prisma.ts
import { PrismaClient } from '@prisma/client';

const databaseUrl = process.env.DATABASE_URL;

const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

export default prismaClient;