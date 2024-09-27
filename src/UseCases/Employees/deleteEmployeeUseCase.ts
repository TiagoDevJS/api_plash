import { inject, injectable, singleton } from "tsyringe/dist/decorators";
import { DeleteEmployeUseCaseInterface } from "../../Interfaces/Employees/deleteEmployee";
import { EmployeeRepository } from "../../Repositories/Employees";
import logger from "../../adapters/winstomLogger";

/**
 * @class EmployeeUSeCaseDelete
 * @implements {DeleteEmployeUseCaseInterface}
 * @description Caso de uso responsável por deletar um colaborador (Employee) no sistema.
 */
@injectable()
export class EmployeeUSeCaseDelete implements DeleteEmployeUseCaseInterface {
  /**
   * @constructor
   * @description Inicializa o caso de uso com o repositório necessário para deletar colaboradores.
   * 
   * @param {EmployeeRepository} employeeRepo - Repositório responsável por manipular dados dos colaboradores.
   */
  constructor(
    //@ts-ignore
    @inject(EmployeeRepository)
    private readonly employeeRepo: EmployeeRepository
  ) {}

  /**
   * @method execute
   * @description Executa o processo de deleção de um colaborador no sistema, verificando se o colaborador existe antes de removê-lo.
   * 
   * @param {number} id - ID do colaborador que será deletado.
   * @returns {Promise<boolean>} Retorna `true` se o colaborador for deletado com sucesso, ou `false` caso contrário.
   */
  async execute(id: number): Promise<boolean> {
    logger.info(`Iniciando serviço para deletar colaborador`);

    // Verifica se o colaborador com o ID existe no sistema
    const existEmployee = await this.employeeRepo.findID(id);

    if (!existEmployee) {
      logger.warn(`Colaborador ${id} não encontrado`);
      return false;
    }

    try {
      // Deleta o colaborador do repositório
      await this.employeeRepo.delete(id);
      logger.info(`Colaborador deletado com sucesso!`);
      return true;
    } catch (error) {
      logger.error(`Erro no serviço ao deletar colaborador: ${error}`);
      return false;
    }
  }
}
