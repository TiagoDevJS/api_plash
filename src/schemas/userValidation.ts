import { z } from "zod";

export const userSchema = z.object({

    name: z.string().min(1, {message:"O nome é obrigatório."}),
    lastName: z.string().min(1, {message:"O sobre nome é obrigatório."}),
    email: z.string().email({message:"Insira um email valido!"}),
    cep: z.string().min(1, {message:"O cep e obrigatorio."}),
    city: z.string().min(1, {message:"A cidade é obrigatório."}),
    district: z.string().min(1, {message:"O bairro é obrigatório."}),
    adress: z.string().min(1, {message:"O Endereço é obrigatório."}),
    numberAdress: z.string().min(1, {message:"O numero do endereço  é obrigatório."}),
    complement: z.string().min(1, {message:"O complemento é obrigatório."}),
    avatar: z.string().url("O link da capa deve ser uma URL válida."),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,'O password precisa conter 8 caracters : 1 masicula, 1 minuscula , 1 caracter especial ').min(8, {message:"O password precisa conter 8 caracters : 1 masicula, 1 minuscula , 1 caracter especial "}),
  });
  
  