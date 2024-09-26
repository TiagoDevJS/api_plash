import { inject, singleton } from "tsyringe/dist/decorators";
import { ArticlesRepository } from "../../Repositories/Articles";
import { createArticleInputDTO, updateArticleInputDTO } from "../../DTO/Articles/inputDTO";
import { IPostUseCaseInterface } from "../../Interfaces/Articles/IArticlePostUseCase";
import { BadRequestError } from "../../handleError/errors";
import logger from "../../adapters/winstomLogger";
import { Article } from "../../Entities/article";


@singleton()
export class PostArticleUseCase implements IPostUseCaseInterface {
  constructor(
    //@ts-ignore
    @inject(ArticlesRepository)
    private readonly articleRepository: ArticlesRepository
  ) {}
  // Funçao responsavel por enviar e manipular os dados para persistencia no banco de dados 
  async create(props: createArticleInputDTO): Promise<string | null> {
  
    try {
      // Entity Article
       const data = Article.create(props)
       const article = await this.articleRepository.create(data);
       
       if(!article){
        logger.error(`Erro ao  criar artigo`)
        throw new BadRequestError(`Erro ao criar artigo. Tente novamente!`)
       }
       return article;
    } catch (error) {
      logger.error(`Erro  use case  criar artigo : ${error}`)
      throw new BadRequestError(`Erro ao chamar respositorio criar artigo`)
    }
   
    
  }
  
}
