import { inject, singleton } from "tsyringe/dist/decorators";
import { ArticlesRepository } from "../../Repositories/Articles";
import { IDeleteUseCase } from "../../Interfaces/Articles/IDeleteUseCase";
import { BadRequestError, NotFoundError } from "../../handleError/errors";
import logger from "../../adapters/winstomLogger";
@singleton()
export class DeleteArticleUseCase implements IDeleteUseCase {
    constructor(
        //@ts-ignore
        @inject(ArticlesRepository) // Injeta a dependência do repositório
        private readonly articlesRepositoryDelete: ArticlesRepository
    ){

    }
   async delete(id: number): Promise<string | null> {
    const existArticle = await this.articlesRepositoryDelete.findID(id)
    if(!existArticle){
        logger.warn(`Artigo nao encontrado!`)
        throw new NotFoundError('Artigo não encontrado')
    }
    try {
    const data =  await this.articlesRepositoryDelete.deleteByID(id);
    return data
    } catch (error) {
        logger.error(`Erro ao deletar o artigo :${error}`)
        throw new BadRequestError(`Erro usecase deletar artigo`)
    }
    
   }
}