import { z } from 'zod';

const employeeSchema = z.object({
  id: z.number().int(), // 
  name: z.string().min(1, { message: "O nome é obrigatório." }), // Validação do nome
  
});
export const magazineSchema = z.object({
  author: z.string().min(1, {message:"O autor é obrigatório."}),
  company: z.string().min(1, {message:"A empresa é obrigatória."}),
  volume: z.string().min(1, {message:"O campo é obrigatória."}),
  name: z.string().min(1, {message:"O nome é obrigatório."}),
  subCategory: z.string().min(1, {message:"O nome é obrigatório."}),
  model: z.string().min(1, {message:"O nome é obrigatório."}),
  magazine_pdf: z.string().url("O link da capa deve ser uma URL válida."),
  price: z.number().int().positive(),
  description: z.string().min(1,{message:"A descriçao do artigo e obrigatória"}),
  cover: z.string().url("O link da capa deve ser uma URL válida."),
  categoryId: z.number().int().positive({message:"O ID da categoria deve ser um número positivo."}),
  employees: z.array(employeeSchema).min(1, {message:"O status é obrigatório."})
});










