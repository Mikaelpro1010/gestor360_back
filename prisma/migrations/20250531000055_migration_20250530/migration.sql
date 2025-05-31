-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT,
    "sexo" TEXT,
    "dataNascimento" TIMESTAMP(3),
    "endereco" TEXT,
    "numero" TEXT,
    "bairro" TEXT,
    "cep" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "situacao" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "documentos" TEXT[],
    "anotacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_cpf_key" ON "Client"("cpf");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
