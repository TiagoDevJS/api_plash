import { Router } from "express";
import { DvlsController } from "../../Controllers/Admin/Dvls";
const controller = new DvlsController();
const router = Router();
router.get("/all", async (req, res) => {
  const response = await controller.findAll();
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
router.get("/:id");
router.post("/update",async (req, res) => {
   const { ids, pay} = req.body
  const response = await controller.update(ids, pay);
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
export default router;
