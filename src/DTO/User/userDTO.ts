export type UserInputDto = {
  name: string;
  lastName: string;
  district: string;
  password: string;
  email: string;
  cep: string;
  adress: string;
  city: string;
  complement: string;
  numberAdress: string;
  avatar: string;
  library?:[{id:number}] | undefined
};
export type UserOutput = {
    id:number
    name: string;
    token?:string
    email: string;
   
  };
