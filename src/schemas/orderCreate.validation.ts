import { z } from 'zod';

export const cartSchema = z.object({
    id:z.number().int().positive()
})
export const createOrderSchema = z.object({
    id:z.string().min(1,{message:"ID obrigatorio!"}),
    name:z.string().min(1,{message: 'Campo necessário obrigatorio!'}),
    email:z.string().email({message: 'Campo necessário obrigatorio!'}),
    cart: z.array(cartSchema)
})