import { Router, Request, Response } from "express";

// import { CreateUsuarioController } from "./controllers/users/CreateUsuarioController";
import { AuthUserController } from "../controllers/users/AuthUserController";

import { CreateUsuarioController } from "../controllers/users/CreateUsuarioController";

import { DeleteUsuarioController } from "../controllers/users/DeleteUsuarioController";

import { UpdateUsuarioController } from "../controllers/users/UpdateUsuarioController ";

const router = Router();

router.get("/", (req, res) => {
  res.send("API Gestor360 está funcionando! 🚀");
});

// Rotas de usuários
router.post("/login", new AuthUserController().handle);
router.post("/register", new CreateUsuarioController().handle);
router.delete("/users/:id", new DeleteUsuarioController().handle);
router.put("/users/:id", new UpdateUsuarioController().handle);

export default router;