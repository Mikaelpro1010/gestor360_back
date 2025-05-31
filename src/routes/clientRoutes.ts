import { Router, Request, Response } from "express";

import { CreateClienteController } from "../controllers/clients/CreateClienteController";

import { GetClientesController } from "../controllers/clients/GetClientesController";

import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

// Rotas de clientes
router.post("/clients", isAuthenticated, new CreateClienteController().handle);
router.get("/clients", isAuthenticated, new GetClientesController().handle);

export default router;
