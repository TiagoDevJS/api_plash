import { inject, injectable } from "tsyringe/dist/decorators";
import { UpdateDvlUseCaseInterface } from "../../Interfaces/Dvls/updateDvlUseCaseInterface";
import { DvlsRepository } from "../../Repositories/Dvls";
import logger from "../../adapters/winstomLogger";
import { BADFAMILY } from "dns";
import { BadRequestError, NotFoundError } from "../../handleError/errors";
import { DvlOutupDTO } from "../../DTO/Dvls/outputDTO";
import { allowedNodeEnvironmentFlags } from "process";
import { UserUpdatePayment } from "../User/updatePaymentUserUseCase";
import { container } from "tsyringe";

@injectable()
export class UpdateDvlUseCase implements UpdateDvlUseCaseInterface {
  private updateManyPaymentsUserUseCase:UserUpdatePayment
  constructor(
    //@ts-ignore
    @inject(DvlsRepository)
    private readonly dvlRepo: DvlsRepository
  ) {
     this.updateManyPaymentsUserUseCase = container.resolve(UserUpdatePayment)
  }
  // Executa a funçao para atualizar os pagamentos!
  async execute(ids: number[], paidOut: number): Promise<string> {
    try {
      const valueCheking = await this.verifyValuePaidOut(ids, paidOut);
      const update = await this.dvlRepo.update(ids, paidOut);
      this.updateManyPaymentsUserUseCase.getDadosUseUpdate(update)
      return "Atualizado com sucesso ";
    } catch (error: any) {
      logger.error(`Erro ao atualizar os dados de pagamento  ${error}`);
      throw new BadRequestError(
        `Erro atualizar dados de pagamento ${error.message}`
      );
    }
  }
  // verifica se o valor  apagar e maior do que receber 
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
  // Busca os dvls na base dados 
  private async findDvls(ids: number[]): Promise<DvlOutupDTO[]> {
    const dvls = await this.dvlRepo.findAllByIDS(ids);
    if (dvls.length <= 0) {
      throw new NotFoundError(`Dvls não encontrados!`);
    }
 
    return dvls;
  }
}
