import { z } from 'zod';

export const articleSchema = z.object({
  author: z.string().min(1, {message:"O autor é obrigatório."}),
  company: z.string().min(1, {message:"A empresa é obrigatória."}),
  name: z.string().min(1, {message:"O nome é obrigatório."}),
  description: z.string().min(1,{message:"A descriçao do artigo e obrigatória"}),
  cover: z.string().url("O link da capa deve ser uma URL válida."),
  magazineId: z.number().int().positive({message:"O ID da revista deve ser um número positivo."}),
  categoriesId: z.number().int().positive({message:"O ID da categoria deve ser um número positivo."}),
  status: z.string().min(1, {message:"O status é obrigatório."}),
});

