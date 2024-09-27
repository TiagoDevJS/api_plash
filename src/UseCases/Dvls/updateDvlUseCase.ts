import { inject, injectable } from "tsyringe/dist/decorators";
import { UpdateDvlUseCaseInterface } from "../../Interfaces/Dvls/updateDvlUseCaseInterface";
import { DvlsRepository } from "../../Repositories/Dvls";
import logger from "../../adapters/winstomLogger";
import { BadRequestError, NotFoundError } from "../../handleError/errors";
import { DvlOutupDTO } from "../../DTO/Dvls/outputDTO";
import { allowedNodeEnvironmentFlags } from "process";
import { UserUpdatePayment } from "../User/updatePaymentUserUseCase";
import { container } from "tsyringe";

/**
 * @class UpdateDvlUseCase
 * @description Classe responsável pela atualização dos pagamentos de DVLS.
 */
@injectable()
//Classe Update Dvl
export class UpdateDvlUseCase implements UpdateDvlUseCaseInterface {
  private updateManyPaymentsUserUseCase: UserUpdatePayment;
  /**
   * @constructor
   * @param {DvlsRepository} dvlRepo - Repositório para manipulação de dados dos DVLS.
   */
  constructor(
    //@ts-ignore
    @inject(DvlsRepository)
    private readonly dvlRepo: DvlsRepository
  ) {
    this.updateManyPaymentsUserUseCase = container.resolve(UserUpdatePayment);
  }

  /**
   * @description Executa a função para atualizar os pagamentos dos DVLS em massa.
   * @param {number[]} ids - Array de IDs dos DVLS a serem atualizados.
   * @param {number} paidOut - Valor a ser atualizado no pagamento.
   * @returns {Promise<string>} Retorna uma mensagem de sucesso após a atualização.
   * @throws {BadRequestError} Lança um erro caso a atualização falhe.
   
   */
  async execute(ids: number[], paidOut: number): Promise<string> {
    try {
      const valueCheking = await this.verifyValuePaidOut(ids, paidOut);

      const update = await this.dvlRepo.update(ids, paidOut);
      /**  @description Envia os dados para  usecase update user para atualizar os dvls que contem relaçao com usuarios*/
      this.updateManyPaymentsUserUseCase.getDadosUseUpdate(update);

      return "Atualizado com sucesso ";
    } catch (error: any) {
      logger.error(`Erro ao atualizar os dados de pagamento  ${error}`);

      throw new BadRequestError(
        `Erro atualizar dados de pagamento ${error.message}`
      );
    }
  }

  /**
   * @description Verifica se o valor a ser pago é maior que o valor recebido.
   * @param {number[]} ids - Array de IDs dos DVLS a serem verificados.
   * @param {number} pay - Valor que está sendo pago.
   * @returns {Promise<boolean>} Retorna false se o valor for válido.
   * @throws {BadRequestError} Lança um erro caso o valor a pagar seja maior que o valor a receber.
   */
  private async verifyValuePaidOut(
    ids: number[],
    pay: number
  ): Promise<boolean> {
    const findDvls = await this.findDvls(ids);

    const result = findDvls.some((value) => value.paidOut < pay);

    if (result) {
      logger.error(
        `Erro ao atualizar os pagamentos: Valor a pagar e maior que o valor a receber.`
      );

      throw new BadRequestError(
        `Erro ao atualizar os pagamentos: Valor a pagar e maior que o valor a receber .`
      );
    }

    return false;
  }
  /**
   * @description Busca os DVLS na base de dados com base nos IDs fornecidos.
   * @param {number[]} ids - Array de IDs dos DVLS a serem buscados.
   * @returns {Promise<DvlOutupDTO[]>} Retorna um array de DVLS encontrados.
   * @throws {NotFoundError} Lança um erro caso nenhum DVL seja encontrado.
   */
  private async findDvls(ids: number[]): Promise<DvlOutupDTO[]> {
    const dvls = await this.dvlRepo.findAllByIDS(ids);

    if (dvls.length <= 0) {
      throw new NotFoundError(`Dvls não encontrados!`);
    }

    return dvls;
  }
}
