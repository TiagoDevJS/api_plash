

export type EventsInputDTO = {
  name: string;
  organizer: string;
  email: string;
  phone: string;
  date_event_initial: string;
  date_event_event: string;
  descript: string;
  banner:string,
  cover:string
};
export type QueryEvents =  {
    take:number | undefined,
    skip:number | undefined,
    page?:number | undefined
    name?:string | undefined,
    email?:string | undefined
    organizer?:string | undefined,
   
   
}