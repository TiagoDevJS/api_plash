import { Router } from "express";
import AuthControllers from "../Controllers/Auth";
import { AdminController } from "../Controllers/Admin/AdminUser";
import { UserController } from "../Controllers/Admin/User";
 const controller = new AdminController()
 const controllerUser = new UserController()
// Rotas públicas
const router = Router();
router.post("/signup/admin",async (req,res)=>{
    const data = await controller.create(req.body)
    const {body, statusCode} = data
    return res.status(statusCode).json(body)
});
router.post("/signin/admin", async (req,res)=>{
     const { code} = req.body
    const data = await controller.authenticated(code)
    
    return res.status(200).json({message:"ok"})});

    router.post("/signup",async (req,res)=>{
        const data = await controllerUser.create(req.body)
        const {body, statusCode} = data
        return res.status(statusCode).json(body)
    });




router.post("/signin/employee", AuthControllers.authenticationEmployee);

router.post("/signIn", AuthControllers.authentication);
export default router;
