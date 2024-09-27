import { inject, injectable, singleton } from "tsyringe/dist/decorators";
import { CreateEmployeeInterface } from "../../Interfaces/Employees/createEmployeeInterface";
import { Employee } from "../../Entities/employee";
import { EmployeeRepository } from "../../Repositories/Employees";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, Conflict } from "../../handleError/errors";
/**
 * @class EmployeeUSeCaseCreate
 * @implements {CreateEmployeeInterface}
 * @description Caso de uso responsável por criar um novo colaborador (Employee) no sistema.
 */
@injectable()
export class EmployeeUSeCaseCreate implements CreateEmployeeInterface {
  /**
   * @constructor
   * @description Inicializa o caso de uso com o repositório necessário para criar colaboradores.
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
   * @description Executa o processo de criação de um colaborador no sistema, verificando se o e-mail já existe e criando um novo registro se não houver conflitos.
   * 
   * @param {Employee} input - Objeto contendo os dados do colaborador a ser criado.
   * @returns {Promise<string | null>} Retorna uma string indicando sucesso ou `null` se houver um problema.
   * @throws {Conflict} Lança um erro de conflito se o e-mail do colaborador já estiver cadastrado.
   * @throws {BadRequestError} Lança um erro de requisição incorreta em caso de falha na criação.
   */
  async execute(input: Employee): Promise<string | null> {
    // Verifica se já existe um colaborador com o e-mail fornecido
    const existEmployee = await this.employeeRepo.findByEmail(input.Email);

    if (!existEmployee) {
      throw new Conflict(
        `Erro ao criar colaborador! Email já cadastrado no sistema.`
      );
    }

    try {
      // Cria o colaborador usando a entidade Employee
      const data = await Employee.create(input);
      // Salva o colaborador no repositório
      const response = await this.employeeRepo.create(data);
      // Retorna o resultado da criação
      return response;
    } catch (error) {
      logger.error(`Erro ao criar colaborador: ${error}`);
      throw new BadRequestError(`Erro ao criar colaborador!`);
    }
  }
}
