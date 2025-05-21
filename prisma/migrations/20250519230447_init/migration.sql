-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "roleLevel" INTEGER NOT NULL,
    "managerId" INTEGER,
    "cpf" TEXT,
    "cep" TEXT,
    "estado" TEXT,
    "cidade" TEXT,
    "rua" TEXT,
    "numero" TEXT,
    "bairro" TEXT,
    "complemento" TEXT,
    "cnpj" TEXT,
    "nomeFantasia" TEXT,
    "razaoSocial" TEXT,
    "registroMunicipal" TEXT,
    "registroEstadual" TEXT,
    "empresaCep" TEXT,
    "empresaEstado" TEXT,
    "empresaCidade" TEXT,
    "empresaRua" TEXT,
    "empresaNumero" TEXT,
    "empresaBairro" TEXT,
    "empresaComplemento" TEXT,
    "cargoNaEmpresa" TEXT NOT NULL,
    "nomeEmpresa" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "user_cnpj_key" ON "user"("cnpj");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
