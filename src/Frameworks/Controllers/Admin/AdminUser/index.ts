import path from "path";
import { Admin } from "../../../../Entities/admin";
import { AdminControllerInterface } from "../../../../Interfaces/Admin/AdminControllerInterface";
import { OTPLibProvider } from "../../../../Providers/Otp";
import { ok } from "../../Helpers/helperError";
import { HttpResponse } from "../../Helpers/protocolos";
import QRCode from "qrcode";
import uploadConfig from "../../../../utils/upload";
import prisma from "../../../server/prisma";
import { AdminCreateUseCase } from "../../../../UseCases/Admin/createAdminUseCase";
import { container } from "tsyringe";
import { handleErrorResponse } from "../../../../handleError/swichhandlerError";
export class AdminController implements AdminControllerInterface {
  private otpProvider: OTPLibProvider;
  private createAdminUsecase: AdminCreateUseCase;
  constructor() {
    this.otpProvider = new OTPLibProvider();
    this.createAdminUsecase = container.resolve(AdminCreateUseCase);
  }
  async create(input: any): Promise<HttpResponse<unknown>> {
    try {
      const data = await this.createAdminUsecase.execute(input);
      return ok(data);
    } catch (error: any) {
      return handleErrorResponse(error);
    }
  }
  async authenticated(token: string): Promise<void> {
    const findEmail = await prisma?.admin.findUnique({
      where: {
        email: "teste@gmail.com",
      },
      include: {
        twoFactorAuth: {
          select: {
            secret: true,
          },
        },
      },
    });

    const { twoFactorAuth } = findEmail as any;

    const veryfy = await this.otpProvider.verifyToken(
      token,
      twoFactorAuth.secret
    );
    console.log(veryfy);
    if (veryfy) {
      console.log("Deu macth");
    } else {
      console.log("nao deu macth");
    }
  }
}
