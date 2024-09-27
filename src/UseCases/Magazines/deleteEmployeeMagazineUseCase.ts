import { inject, injectable } from "tsyringe/dist/decorators";
import { DeleteEmployeeMagazineUseCaseInterface } from "../../Interfaces/Magazines/deleteEmployeeMagazine";
import { MagazineRepository } from "../../Repositories/Magazines";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

/**
 * @class MagazineUseCaseRemoveEmployee
 * @implements {DeleteEmployeeMagazineUseCaseInterface}
 * @description Caso de uso responsável pela remoção de um colaborador associado a uma revista no sistema.
 */
@injectable()
export class MagazineUseCaseRemoveEmployee
  implements DeleteEmployeeMagazineUseCaseInterface
{
  /**
   * @constructor
   * @description Injeta o repositório de revistas necessário para remover um colaborador de uma revista.
   * 
   * @param {MagazineRepository} magazineRepo - Repositório responsável pela manipulação dos dados das revistas.
   */
  constructor(
    //@ts-ignore
    @inject(MagazineRepository)
    private readonly magazineRepo: MagazineRepository
  ) {}

  /**
   * @method execute
   * @description Executa o processo de remoção de um colaborador associado a uma revista.
   * 
   * @param {number} magazineId - ID da revista da qual o colaborador será removido.
   * @param {number} employeeId - ID do colaborador a ser removido.
   * @returns {Promise<Boolean>} Retorna true se a remoção foi bem-sucedida, caso contrário, retorna false.
   * 
   * @throws {NotFoundError} Caso a revista não seja encontrada.
   * @throws {BadRequestError} Caso ocorra um erro durante o processo de remoção.
   */
  async execute(magazineId: number, employeeId: number): Promise<Boolean> {
    const existMagazine = await this.magazineRepo.findID(magazineId);
    
    if (!existMagazine) {
      logger.info(`Revista não encontrada`);
      throw new NotFoundError(`Revista não encontrada`);
    }
    
    try {
      const employeeRemove = await this.magazineRepo.removeEmployeeMagazine(
        existMagazine.id,
        employeeId
      );
      return employeeRemove;
    } catch (error) {
      logger.error("Erro ao remover colaborador da revista");
      throw new BadRequestError(`Erro ao remover colaborador da revista`);
    }
  }
}
