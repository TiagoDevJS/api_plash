import { z } from 'zod';


export const employeeSchema = z.object({

  name: z.string().min(1, {message:"O nome é obrigatório."}),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,'O password precisa conter 8 caracters : 1 masicula, 1 minuscula , 1 caracter especial ').min(8, {message:"O password precisa conter 8 caracters : 1 masicula, 1 minuscula , 1 caracter especial "}),
  email: z.string().email("Insira um email válido!"),
  phone: z.string().min(11,{message:"O Telefone precisa conter 11 numeros"}),
  avatar: z.string().url("O link da capa deve ser uma URL válida."),
  commission: z.number().refine((val) => Number(val) === val && val % 1 !== 0, {
    message: "O valor deve ser um número de ponto flutuante.",
  }),
  profession: z.string().min(1, {message:"A profissão é obrigatória!"})
});




