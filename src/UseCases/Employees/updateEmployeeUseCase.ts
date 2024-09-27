import { inject, injectable, singleton } from "tsyringe/dist/decorators";
import { Employee } from "../../Entities/employee";
import { EmployeUpdateUseCaseInterface } from "../../Interfaces/Employees/updateEmployee";
import { EmployeeRepository } from "../../Repositories/Employees";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";

/**
 * @class EmployeeUseCaseUpdate
 * @implements {EmployeUpdateUseCaseInterface}
 * @description Caso de uso responsável pela atualização de um colaborador no sistema.
 */
@injectable()
export class EmployeeUseCaseUpdate implements EmployeUpdateUseCaseInterface {
  /**
   * @constructor
   * @description Injeta o repositório de colaboradores necessário para realizar a atualização.
   *
   * @param {EmployeeRepository} employeeRepo - Repositório responsável pela manipulação dos dados dos colaboradores.
   */
  constructor(
    //@ts-ignore
    @inject(EmployeeRepository)
    private readonly employeeRepo: EmployeeRepository
  ) {}

  /**
   * @method execute
   * @description Executa o processo de atualização de um colaborador no sistema.
   *
   * @param {number} id - ID do colaborador a ser atualizado.
   * @param {Employee} input - Dados atualizados do colaborador.
   * @returns {Promise<string | null>} Retorna uma mensagem de sucesso ou `null` em caso de erro.
   *
   * @throws {NotFoundError} Caso o colaborador não seja encontrado.
   * @throws {BadRequestError} Caso ocorra um erro durante a atualização.
   */
  async execute(id: number, input: Employee): Promise<string | null> {

    const existEmployee = await this.employeeRepo.findID(id);
    if (!existEmployee) {
      logger.info(`Colaborador ${id} não foi encontrado!`);
      throw new NotFoundError(`Colaborador não encontrado!`);
    }

    try {
 
      const data = await Employee.create(input);

     
      const update = await this.employeeRepo.update(
        existEmployee?.id as number,
        data
      );
      return update;
    } catch (error) {
      logger.error(`Erro camada de serviço: ${error}`);
      throw new BadRequestError(
        `Erro ao atualizar o colaborador! Tente novamente mais tarde!`
      );
    }
  }
}
