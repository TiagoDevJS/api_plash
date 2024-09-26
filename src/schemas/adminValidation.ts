import { z } from 'zod';

export const adminSchema = z.object({

  name: z.string().min(1, {message:"O nome é obrigatório."}),
  email: z.string().email({message:"Insira um email valido!"}),
  avatar: z.string().url("O link da capa deve ser uma URL válida."),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,'O password precisa conter 8 caracters : 1 masicula, 1 minuscula , 1 caracter especial ').min(8, {message:"O password precisa conter 8 caracters : 1 masicula, 1 minuscula , 1 caracter especial "}),
});




