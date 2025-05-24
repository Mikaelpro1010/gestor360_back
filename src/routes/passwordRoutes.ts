import { Router } from "express";
import { PasswordRecoveryServiceController } from "../controllers/users/PasswordRecoveryServiceController";
import { PasswordResetServiceController } from "../controllers/users/PasswordResetServiceController";

const router = Router();

// Rotas de recuperação de senha
router.post(
  "/recuperacaosenha",
  new PasswordRecoveryServiceController().handle
);
router.post("/redefinir-senha", new PasswordResetServiceController().handle);

export default router;