import { z } from "zod";


export const bannerSchema = z.object({
  name: z.string().min(1,{message:"O nome precisa ser obrigatorio"}),
  cover: z.string().url("O link da capa deve ser uma URL válida."),
})