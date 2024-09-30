export type ComissionInputDTO = {
  name: string;
  price: number;
  picture: string;
  paidOut: number;
  commission:number;
  toReceive: number;
  employee: { id: number };
};
