import { inject, injectable } from "tsyringe/dist/decorators";
import { UserRepository } from "../../Repositories/User";
type Props = {
  ids: number[];
  receive: number;
};
@injectable()
export class UserUpdatePayment {
  constructor(
    //@ts-ignore
    @inject(UserRepository)
    private readonly userRepo: UserRepository
  ) {}
  async getDadosUseUpdate(props: Props) {
    const dados = await this.userRepo.updateManyUsersAvaibleWithDraw(
      props.ids,
      props.receive
    );
    return dados;
  }
}
