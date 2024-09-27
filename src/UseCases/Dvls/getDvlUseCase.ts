import { inject, injectable } from "tsyringe/dist/decorators";
import { GetDvlUseCaseIntrface } from "../../Interfaces/Dvls/GetDvlUseCaseInterface";
import { DvlsRepository } from "../../Repositories/Dvls";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

/**
 * @class GET UseCase DVL
 * @description Classe responsável por listar os dvl.
 */
@injectable()
export class GetDvlUseCase implements GetDvlUseCaseIntrface {
  constructor(
    //@ts-ignore
    @inject(DvlsRepository)
    private readonly dvlsRepo: DvlsRepository
  ) {}
  /**
    
   * @description Executa a função para listar os DVLS.
   * @returns Retorna uma lista de dvls array 
   * @throws {BadRequestError} Lança um erro caso a ocorra alguma  falha.

    */
  async findAll(): Promise<any> {
    try {
     
      const data = await this.dvlsRepo.findAll();
     
      return data;
    } catch (error: any) {
      logger.error(`Erro ao buscar dvls no banco de dados ${error.message}`);
      throw new BadRequestError(`Erro ao buscar vls na base de dados `);
    }
  }
   /**
    
   * @description Executa a função para listar um DVL.
   * @returns Retorna uma objeto de dvl
   *  @throws {NotFoundError} Lança um erro caso não encontre o dvl buscado.
   * @throws {BadRequestError} Lança um erro caso a ocorra alguma  falha.

    */
  async findID(id: number): Promise<any> {
  
    const existDvl = await this.dvlsRepo.findID(id);
   
    if (!existDvl) {
     
      logger.warn(`Dvl ${id} não encontrado!`);
      throw new NotFoundError(`Dvl não encontrado`);
    }
    try {
     
      return existDvl;
    } catch (error: any) {
      
      logger.error(`Erro ao buscar dvl solicitado :${error.message}`);
      
      throw new BadRequestError(`Erro ao buscar dvl solicitado`);
    }
  }
}
