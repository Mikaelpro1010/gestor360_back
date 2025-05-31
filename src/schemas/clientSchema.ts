import { z } from "zod";

export const clientSchema = z
  .object({
    // Chave estrangeira obrigatória
    userId: z.string(),

    // Informações Gerais
    email: z.string().email(),
    contato: z.string(),
    cpf: z.string().length(11),
    rg: z.string().optional().nullable(),
    sexo: z.string().optional().nullable(),
    dataNascimento: z.coerce.date().optional().nullable(),

    // Endereço
    endereco: z.string().optional().nullable(),
    numero: z.string().optional().nullable(),
    bairro: z.string().optional().nullable(),
    cep: z.string().optional().nullable(),
    cidade: z.string().optional().nullable(),
    estado: z.string().optional().nullable(),

    // Campos obrigatórios
    situacao: z.string(),
    origem: z.string(),

    // Documentos como array de strings (obrigatório)
    documentos: z.array(z.string()),

    // Anotações (opcional)
    anotacoes: z.string().optional().nullable(),
  })
  .strict();
