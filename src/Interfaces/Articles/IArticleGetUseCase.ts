import { ArticleOutputDto } from "../../DTO/Articles/outputDTO";

export interface IArticleUseCaseInterface {
    getAllArticles(query:any):Promise<{articles:ArticleOutputDto[]; finalPage:number}| null>
    getArticleID(id:number):Promise<ArticleOutputDto | null>
    getMostViews():Promise<ArticleOutputDto[] | null>
    getArticlesFree():Promise<ArticleOutputDto[] | null>
    getArticlesRecommended():Promise<ArticleOutputDto[] | null>

}