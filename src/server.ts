import express, { Request, Response } from "express";
import passwordRoutes from "./routes/passwordRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use(passwordRoutes);
app.use(userRoutes);

app.listen(3333, () => console.log("servidor online na porta 3333"));