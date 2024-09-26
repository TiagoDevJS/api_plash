import { response, Router } from "express";
import {BannerController} from "../../Controllers/Admin/Banners/index";
import { bannerSchema } from "../../../schemas/bannerValiadation";
 const controller = new BannerController()
const router = Router()
router.get(
    "/all",
    async(req,res)=>{
        const response = await controller.findAll()
        const {body,statusCode} = response
        return res.status(statusCode).json(body)
    }
    
  );
  router.get(
    "/all/public",
    async(req,res)=>{
        const response = await controller.publicFindAll()
        const {body,statusCode} = response
        return res.status(statusCode).json(body)
    }
    
  );
router.post(
    "/create",
    async(req,res)=>{
        const data = bannerSchema.safeParse(req.body);
        if (data.error) {
          const errorMessages = data.error.errors.map((error) => ({
            path: error.path.join("."), // Usa o caminho para indicar onde ocorreu o erro
            message: error.message,
          }));
      
          return res.status(404).json(errorMessages);
        }
        const response = await controller.create(data.data)
        const {body,statusCode} = response
        return res.status(statusCode).json(body)
    }
  );
  router.delete(
    "/delete/:slug",
    
  );

export default router