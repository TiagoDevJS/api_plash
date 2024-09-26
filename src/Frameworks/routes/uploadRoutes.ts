import { Router } from "express";
import multer from "multer";
import { UploadController } from "../Controllers/Admin/Upload/uploadController";
const router = Router();

const controller = new UploadController();
const upload = multer({ storage: multer.memoryStorage() });
router.post("/pdf",upload.single("pdf"), async (req, res) => {
    const file = req.file;
  
  
    const response = await controller.createPrivateUrl(file);
    
    const { body, statusCode } = response;
    return res.status(statusCode).json(body);
  });
  router.post("/file", upload.single("file"), async (req, res) => {
    const file = req.file;
  
    const response = await controller.createPublicUrl(file);
    
    const { body, statusCode } = response;
    return res.status(statusCode).json(body);
  });

  export default router