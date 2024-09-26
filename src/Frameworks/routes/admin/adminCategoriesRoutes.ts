import { Router } from "express";
import { CategoriesController } from "../../Controllers/Admin/Categories";
import { categoriesSchema } from "../../../schemas/categoriesValidation";
const router = Router();
const controller = new CategoriesController();
router.get("/all", async (req, res) => {
  const response = await controller.findAll();
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  const response = await controller.findID(Number(slug));
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
router.post("/create", async (req, res) => {
 
  const data =  categoriesSchema.safeParse(req.body);
  if (data.error) {
    const errorMessages = data.error.errors.map((error) => ({
      path: error.path.join("."), 
      message: error.message,
    }));

    return res.status(404).json(errorMessages);
  }
   
    const response = await controller.create(data.data.name);
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
router.put("/update/:slug", async (req, res) => {
  const { slug } = req.params;
  const { name } = req.body;
  const response = await controller.update(Number(slug), name);
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
router.delete("/delete/:slug", async (req, res) => {
  const { slug } = req.params;
  const response = await controller.delete(Number(slug));
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
export default router;
