import { inject, singleton } from "tsyringe/dist/decorators"
import { updateArticleInputDTO } from "../../DTO/Articles/inputDTO"
import { ArticlesRepository } from "../../Repositories/Articles"
import { IUpdateUseCase } from "../../Interfaces/Articles/IUpdateUseCase"
import logger from "../../adapters/winstomLogger"
import { BadRequestError, NotFoundError } from "../../handleError/errors"


@singleton()
 // Funçao responsavel por enviar e manipular os dados para atualizar a persistencia no banco de dados 
export class UpdateArticleUseCase implements IUpdateUseCase{
    constructor(
        //@ts-ignore
        @inject(ArticlesRepository) // Injeta a dependência do repositório
        private readonly articlesRepository: ArticlesRepository){
    }
    async update(id: number, input: updateArticleInputDTO): Promise<string | null> {
        const existArticle = await this.articlesRepository.findID(id)
        if(!existArticle){
        logger.warn(`Artigo não encontrado!`)
        throw new NotFoundError(`Artigo não encontrado`)
        }
        try {
            const data = await this.articlesRepository.update(id, input)
            return data
        } catch (error) {
            logger.error(`Erro use case atualizar artigo : ${error}`)
            throw new  BadRequestError('Erro  use case update artigos')
        }
     
      }
}