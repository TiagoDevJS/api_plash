import { Router } from "express";
import { CategoriesController } from "../Controllers/Admin/Categories/index";
const categories = new CategoriesController();
const router = Router();
router.get("/all", async (req, res) => {
  const response = await categories.findAll();
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const response = await categories.findID(Number(slug));
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
export default router;
