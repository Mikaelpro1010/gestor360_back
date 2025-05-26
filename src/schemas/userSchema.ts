import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),

  // Hierarquia
  managerId: z.number().int().optional(),

  // Dados pessoais (opcionais)
  cpf: z.string().length(11).optional(),
  cep: z.string().min(8).optional(),
  estado: z.string().optional(),
  cidade: z.string().optional(),
  rua: z.string().optional(),
  numero: z.string().optional(),
  bairro: z.string().optional(),
  complemento: z.string().optional(),

  // Dados da empresa com CNPJ (opcionais, mas condicionalmente exigíveis)
  cnpj: z.string().length(14).optional(),
  nomeFantasia: z.string().optional(),
  razaoSocial: z.string().optional(),
  registroMunicipal: z.string().optional(),
  registroEstadual: z.string().optional(),
  empresaCep: z.string().optional(),
  empresaEstado: z.string().optional(),
  empresaCidade: z.string().optional(),
  empresaRua: z.string().optional(),
  empresaNumero: z.string().optional(),
  empresaBairro: z.string().optional(),
  empresaComplemento: z.string().optional(),

  // Campo obrigatório sempre
  cargoNaEmpresa: z.string(),

  // Empresa sem CNPJ
  nomeEmpresa: z.string().optional()
}).strict();
