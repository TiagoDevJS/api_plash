export type createArticleInputDTO = {
  author: string;
  company: string;
  description: string;
  name: string;
  cover:string,
  status: string;
  magazineId:number,
  categoriesId: number,
};
export type updateArticleInputDTO = {
  author: string;
  company: string;
  description: string;
  name: string;
  views: number;
  cover:string,
  status: string;
  magazineId:number,
  categoriesId: number,
};
export type QueryParms = {
  author?: string,
company?: string,
take?: number,
status?: string,
name?: string,
page?:number
}