import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),

  // Hierarquia
  managerId: z.number().int().optional().nullable(),

  // Dados pessoais (opcionais)
  cpf: z.string().length(11).optional().nullable(),
  cep: z.string().min(8).optional().nullable(),
  estado: z.string().optional().nullable(),
  cidade: z.string().optional().nullable(),
  rua: z.string().optional().nullable(),
  numero: z.string().optional().nullable(),
  bairro: z.string().optional().nullable(),
  complemento: z.string().optional().nullable(),

  // Dados da empresa com CNPJ (opcionais)
  cnpj: z.string().length(14).optional().nullable(),
  nomeFantasia: z.string().optional().nullable(),
  razaoSocial: z.string().optional().nullable(),
  registroMunicipal: z.string().optional().nullable(),
  registroEstadual: z.string().optional().nullable(),
  empresaCep: z.string().optional().nullable(),
  empresaEstado: z.string().optional().nullable(),
  empresaCidade: z.string().optional().nullable(),
  empresaRua: z.string().optional().nullable(),
  empresaNumero: z.string().optional().nullable(),
  empresaBairro: z.string().optional().nullable(),
  empresaComplemento: z.string().optional().nullable(),

  // Campo obrigatório sempre
  cargoNaEmpresa: z.string(),

  // Empresa sem CNPJ
  nomeEmpresa: z.string().optional().nullable()
}).strict();