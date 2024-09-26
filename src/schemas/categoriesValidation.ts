import { z } from 'zod';

export const categoriesSchema = z.object({
  name: z.string().min(1, {message:"Campo obrigatori!"})
})