import express, { Request, Response } from "express";
import passwordRoutes from "./routes/passwordRoutes";
import userRoutes from "./routes/userRoutes";
import clientRoutes from "./routes/clientRoutes";
import cors from "cors"; // Importe o pacote CORS

const app = express();

// Configure o CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Altere para o domínio do seu front-end
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use(passwordRoutes);
app.use(userRoutes);
app.use(clientRoutes);

app.listen(3333, () => console.log("servidor online na porta 3333"));
