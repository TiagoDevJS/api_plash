import Router, { RequestHandler } from "express";
import { EmployeeController } from "../../Controllers/Admin/Employees";
import logger from "../../../adapters/winstomLogger";
const router = Router();
const controller = new EmployeeController();
router.post("/create", async (req, res) => {
  const response = await controller.create(req.body);
  const { statusCode, body } = response;
  return res.status(statusCode).json(body);
});
router.post("/update/:id", async (req, res) => {
  logger.info(`Iniciando rota de atualizaçaõ de colaboradores!`)
  const  {id} = req.params
  if(!id){
    return res.status(404).json({message:'ID obrigatório!'})
  }
  const response = await controller.update(Number(id),req.body);
  const { statusCode, body } = response;
  return res.status(statusCode).json(body);
}
);

router.delete("/delete/:id", async (req, res) => {
  logger.info(`Iniciando rota de atualizaçaõ de colaboradores!`)
  const  {id} = req.params
  if(!id){
    return res.status(404).json({message:'ID obrigatório!'})
  }
  const response = await controller.delete(Number(id));
  const { statusCode, body } = response;
  return res.status(statusCode).json(body);
});

router.get("/all", async (req, res) => {
  logger.info(`Iniciando rota de atualizaçaõ de colaboradores!`)
  
  const response = await controller.findAll(req.query);
  const { statusCode, body } = response;
  return res.status(statusCode).json(body);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "ID obrigatório!" });
  }
  const response = await controller.findID(Number(id));
  const { statusCode, body } = response;
  return res.status(statusCode).json(body);
});

export default router;



router.post("/employee/finance", async (req, res) => {});
router.get("/last-employees", async (req, res) => {});