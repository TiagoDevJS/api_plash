import { z } from "zod";

export const sponsorsSchema = z.object({

    name: z.string().min(1, {message:"O nome é obrigatório."}),
    company: z.string().min(1, {message:"O nome é obrigatório."}),
    email: z.string().email("Insira um email válido!"),
    phone: z.string().min(11,{message:"O Telefone precisa conter 11 numeros"}),
    cover: z.string().url("O link da capa deve ser uma URL válida."),
    url:  z.string().url("O link da capa deve ser uma URL válida.")
    
  });
  
  
  
  
  