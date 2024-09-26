import { z } from 'zod';

export const sponsorSchemaEventID = z.number().int().positive({ message: 'Necessário informar um ID de patrocinador válido!' });
export const sponsorSchemaEvent = z.object({
  id:z.number().int().positive({message: 'Necessario informar o id do patrocinador!'})
})
export const eventsSchema = z.object({
  name: z.string().min(1, {message:"O nome é obrigatório."}),
  organizer: z.string().min(1, {message:"O organizador  é obrigatório."}),
  phone: z.string().min(11, {message:"O numero teletone deve conter 11 digitos  é obrigatório."}),
  email: z.string().email({message:"A empresa é obrigatória."}),
  descript: z.string().min(1,{message:"A descriçao do artigo e obrigatória"}),
  cover: z.string().url("O link da capa deve ser uma URL válida."),
  banner: z.string().url("O link da capa deve ser uma URL válida."),
  date_event_initial: z.string().min(1, {message:"A data incial do evento  é obrigatório."}),
  date_event_end: z.string().min(1, {message:"A data final do evento  é obrigatório."}),
  sponsors: z.array(sponsorSchemaEvent)
}).strict();

