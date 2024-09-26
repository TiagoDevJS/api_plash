import { Router } from "express";
import { MagazineController } from "../../Controllers/Admin/Magazines";
import logger from "../../../adapters/winstomLogger";

const controller = new MagazineController();
const router = Router();
// Rota para criar a revista
router.post("/create", async (req, res) => {
 
  const response = await controller.create(req.body);
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
// Rota para atualizar a revista
router.post("/update/:id", async (req, res) => {
  const { id} = req.params
  const response = await controller.update(Number(id), req.body);
  const { body, statusCode } = response;
  return res.status(statusCode).json(body)});

router.post("/remove/employee/:id",async (req,res)=>{
  const { id} = req.params
   const { employeeId} = req.body
  const response = await controller.removeEmployeeMagazine(Number(id),employeeId );
  const { body, statusCode } = response;
  return res.status(statusCode).json(body)});

// Rota para buscar as revistas
router.get("/all", async(req, res)=>{

  logger.info(`[Iniciando a rota ]`)
  const response = await controller.findAll(req.query);
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
}
);

// Rota para buscar a revista
router.get("/:id" ,async(req, res)=>{
  const { id} = req.params
  logger.info(`[Iniciando a rota ]`)
  const response = await controller.findID(Number(id));
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
// Rota para deletar a revista
router.delete("/delete/:id", async (req, res) => {
  const { id} = req.params
  const response = await controller.delete(Number(id));
  const { body, statusCode } = response;
  return res.status(statusCode).json(body)})

export default router;
