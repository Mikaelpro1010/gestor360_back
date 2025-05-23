-- AlterTable
ALTER TABLE "user" ADD COLUMN     "codeExpiresAt" TIMESTAMP(3),
ADD COLUMN     "verificationCode" TEXT;
