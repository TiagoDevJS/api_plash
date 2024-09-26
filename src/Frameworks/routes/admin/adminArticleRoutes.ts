import { Router } from "express";
import { articleSchema } from "../../../schemas/articlesValadation";
import { ArticlesController } from "../../Controllers/Admin/Articles";
import logger from "../../../adapters/winstomLogger";
const router = Router();
const articles = new ArticlesController();

router.post("/create", async (req, res) => {
  const data = articleSchema.safeParse(req.body);
  if (data.error) {
    const errorMessages = data.error.errors.map((error) => ({
      path: error.path.join("."), // Usa o caminho para indicar onde ocorreu o erro
      message: error.message,
    }));

    return res.status(404).json(errorMessages);
  }
  const response = await articles.create(data.data);
  const { body, statusCode } = response;

  return res.status(statusCode).json(body);
});
router.put("/update/:slug", async (req, res) => {
  const { slug } = req.params;
  const data = articleSchema.safeParse(req.body);
  if (data.error) {
    const errorMessages = data.error.errors.map((error) => ({
      path: error.path.join("."),
      message: error.message,
    }));

    return res.status(404).json(errorMessages);
  }
  const response = await articles.update(Number(slug), req.body);
  const { body, statusCode } = response;

  return res.status(statusCode).json(body);
});

router.delete(
  "/delete/:slug",

  async (req, res) => {
    const { slug } = req.params
    const response = await articles.delete(Number(slug));
    const { body, statusCode } = response;

    return res.status(statusCode).json(body);
  }
);

router.get("/all", async (req, res) => {
  const response = await articles.findAll(req.query);
  const { body, statusCode } = response;

  return res.status(statusCode).json(body);
});
router.get("/:slug", async (req, res) => {
  logger.info(`Iniciando  busca na rota de artigos`);
  const { slug } = req.params;
  const response = await articles.findID(Number(slug));
  const { body, statusCode } = response;

  return res.status(statusCode).json(body);
});

export default router;
