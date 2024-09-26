// routes/userRoutes.js
import { Router } from "express";
import { chekingTokenUser } from "../Middleware";
//import {AdminUserController, UserController} from "../Controllers/User";
import { UserController } from "../Controllers/Admin/User";
import CoversController from "../Controllers/CoversOfMonth";
const controler = new UserController();
const router = Router();
/*
// User protected routes
router.get("/user/perfil", chekingTokenUser, UserController.getOneUser);
router.get("/user/dvls", chekingTokenUser, UserController.getDvls);
router.get("/user/orders", chekingTokenUser, UserController.getOrders);
router.get("/user/orders/:slug", chekingTokenUser, UserController.getOrderID);
router.get("/user/library", chekingTokenUser, UserController.getLibraryUser);
router.get("/user/library/:slug", chekingTokenUser, UserController.getOneBookLibraryUser);
router.get("/user/library/article/:slug", chekingTokenUser, UserController.getOneBookLibraryUser);
router.post(
  "/user/update/perfil",
  chekingTokenUser,
  UserController.updatePerfilUser
);
router.post(
  "/user/password",
  chekingTokenUser,
  UserController.changePassUser
);
router.delete("/user/delete", chekingTokenUser, UserController.deletUser);
router.post(
  "/vote-cover-event/:slug",
  chekingTokenUser,
  CoversController.addVoteCover
);
*/
router.get("/all", async (req, res) => {
  const response = await controler.findAll();
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await controler.findID(Number(id));
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});

export default router;
