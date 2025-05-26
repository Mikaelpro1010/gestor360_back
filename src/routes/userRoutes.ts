import { Router, Request, Response } from "express";

// import { CreateUsuarioController } from "./controllers/users/CreateUsuarioController";
import { AuthUserController } from "../controllers/users/AuthUserController";

import { CreateUsuarioController } from "../controllers/users/CreateUsuarioController";

import { DeleteUsuarioController } from "../controllers/users/DeleteUsuarioController";

import { UpdateUsuarioController } from "../controllers/users/UpdateUsuarioController ";

import { GetUsuariosController } from "../controllers/users/GetUsuariosController";

import { AprovedUserController } from "../controllers/users/AprovedUserController";

import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.get("/", (req, res) => {
  res.send("API Gestor360 está funcionando! 🚀");
});

// Rotas de usuários
router.post("/login", new AuthUserController().handle);
router.post("/register", new CreateUsuarioController().handle);
router.delete("/users/:id", isAdmin, new DeleteUsuarioController().handle);
router.put("/users/:id", isAdmin, new UpdateUsuarioController().handle);
router.get("/users", isAdmin, new GetUsuariosController().handle);
router.patch("/users/:id/approve", isAdmin, new AprovedUserController().handle);

export default router;
