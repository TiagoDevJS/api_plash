import { DvlsRepository } from "./index"; // ajuste o caminho conforme necessário
import { Dvl } from "../../Entities/dvls"; // ajuste o caminho conforme necessário

describe("DvlsRepository", () => {
  beforeEach(() => {
    const dvls = new DvlsRepository();
  });
  const dvls = new DvlsRepository();

  describe("create", () => {
    it("should log input and return expected string", async () => {
      const input: Dvl = {
        userId:1,
        name: "Tiago",
        paidOut: 50,
        picture: "https://cover",
        price: 345,
        toReceive: -10,
      };
      const metada = 1
      const dvlInstance = Dvl.create(input,metada);
      const result = await dvls.create(dvlInstance);

      expect(dvlInstance).toEqual({
        userId: 1,
        name: "Tiago",
        paidOut: 50,
        picture: "https://cover",
        price: 345,
        toReceive: -10,
      });
      expect(result).toBe("ok"); // Verifica se o retorno é o esperado
    });
  });
});

