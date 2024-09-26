import { DvlInputDTO } from "../DTO/Dvls/inputDTO";

export class Dvl {
  public readonly name!: string;
  public readonly price!: number;
  public readonly picture!: string;
  public readonly paidOut!: number;
  public readonly toReceive!: number;
  public readonly userId!: number;
  public readonly keyPayment!:string;


  constructor(props: DvlInputDTO, metadata: number) {
    Object.assign(this, props);

    this.userId = props.userId;
    this.userId = metadata;
    this.paidOut = Math.round((props.price * 2 * 100) / 100);
  }

  static create(props: DvlInputDTO, metadata: number): Dvl {
    return new Dvl(props, metadata);
  }
}
