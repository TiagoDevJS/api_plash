import { Router } from "express";
import { OrdersController } from "../../Controllers/Admin/Orders";
const controller = new OrdersController();
const router = Router();
//Orders
router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "ID é Obrigatório!" });
  }
  const response = await controller.update(Number(id), req.body);
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
router.get("/all", async (req, res) => {
  const response = await controller.findAll(req.query);
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "ID é Obrigatório!" });
  }
  const response = await controller.findAID(Number(id));
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});


export default router;