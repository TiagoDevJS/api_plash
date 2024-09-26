
import Router from 'express'
const router = Router()
import { SponsorsController } from '../../Controllers/Admin/Sponsors/index';
const controller = new SponsorsController()
//Sponsors
router.post(
  "/create", async (req, res) => {
    const response = await controller.create(req.body)
    const { body, statusCode } = response
    return res.status(statusCode).json(body)
  }

);
router.post(
  "/update/:id",
  async (req, res) => {
    const { id } = req.params
    if (!id) {
      return res.status(404).json({ message: "ID Obrigatório!" })
    }
    const response = await controller.update(Number(id), req.body)
    const { body, statusCode } = response
    return res.status(statusCode).json(body)
  }

);
router.get(
  "/all",
  async (req, res) => {

    const response = await controller.getAllSponsors()
    const { body, statusCode } = response
    return res.status(statusCode).json(body)
  }
);
router.get(
  "/:id",
  async (req, res) => {
    const { id} = req.params
    const response = await controller.getIDSponsors(parseInt(id))
    const { body, statusCode } = response
    return res.status(statusCode).json(body)
  }
);



router.delete(
  "/delete/:id",
  async (req, res) => {
    const { id } = req.params
    if (!id) {
      return res.status(404).json({ message: "ID Obrigatório!" })
    }
    const response = await controller.delete(Number(id))
    const { body, statusCode } = response
    return res.status(statusCode).json(body)
  }

);
export default router