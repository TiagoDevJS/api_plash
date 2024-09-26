import { Router } from "express";
import { PagarmeController } from "../../Controllers/Admin/Pagarme";
const controller = new PagarmeController()
const router = Router()
router.post("/create/order/payment", async (req,res)=>{
     const data = await controller.createOrderPayment(req.body)
     const {body , statusCode} = data
     return res.status(statusCode).json(body)
});
router.post("/status-order-payment", async (req,res)=>{
     const data = await controller.statusOrderWebhookNotification(req.body)
     const {body , statusCode} = data
     return res.status(statusCode).json(body)
});

export default router