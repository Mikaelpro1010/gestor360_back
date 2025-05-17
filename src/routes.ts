import { Router, Request, Response } from "express";

// import { CreateUsuarioController } from "./controllers/users/CreateUsuarioController";
import { AuthUserController } from "./controllers/users/AuthUserController";

const router = Router();

router.get("/", (req, res) => {
  res.send("API Gestor360 está funcionando! 🚀");
});

// Rotas de usuários
// router.post("/usuarios", new CreateUsuarioController().handle);
router.post("/login", new AuthUserController().handle);

export { router };