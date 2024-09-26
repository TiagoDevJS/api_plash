import { createArticleInputDTO, QueryParms } from "../../DTO/Articles/inputDTO";
import {  ArticleOutputDto, } from "../../DTO/Articles/outputDTO";
export type FilterQuery = {
  skip: number;
  take: number;
  queryParams: QueryParms;
};
export interface ArticleRepositoryInterface {
  findAll({
    skip,
    take,
    queryParams,
  }: FilterQuery): Promise<{
    articles: ArticleOutputDto[];
    finalPage: number;
  } | null>;
  findID(id: number): Promise<ArticleOutputDto | null>;
  findAllByStatus(status:string, views:number):Promise<ArticleOutputDto[] | null>
  create(input:createArticleInputDTO):Promise<string | null>
  update(id:number, input:createArticleInputDTO):Promise<string | null>
  deleteByID(id:number):Promise<string | null>
}
