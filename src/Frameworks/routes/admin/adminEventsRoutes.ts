import { Router } from 'express'
import { EventsController } from '../../Controllers/Admin/Events';
const router = Router()
const controller = new EventsController()
router.post(
    "/create",
    async(req,res)=>{
     const response = await controller.create(req.body)
     const {statusCode,body} = response
     return res.status(statusCode).json(body)
    }
  );
  router.post(
    "/update/:id",
    async(req,res)=>{
      const { id} = req.params
      if(!id){
        return res.status(404).json({message:'ID obrigatorio!'})
      }
     const response = await controller.update(Number(id),req.body)
     const {statusCode,body} = response
     return res.status(statusCode).json(body)
    }
  );
  router.delete(
    "/:id",
    async(req,res)=>{
      const { id} = req.params
      if(!id){
        return res.status(404).json({message:'ID obrigatorio!'})
      }
    
     const response = await controller.delete(Number(id))
     const {statusCode,body} = response
     return res.status(statusCode).json(body)
    }
  );
  router.delete(
    "/remove-sponsor-event/:id",
    async(req,res)=>{
      const { id} = req.params
      const { sponsorID} = req.body
 
      if(!id){
        return res.status(404).json({message:'ID obrigatorio!'})
      }
 
     const response = await controller.removeSponsorByEvents(Number(id),Number(sponsorID))
     const {statusCode,body} = response
     return res.status(statusCode).json(body)
    }
  );
  router.get(
    "/all",
    async(req,res)=>{
      
    
     const response = await controller.findAll(req.query)
     const {statusCode,body} = response
     return res.status(statusCode).json(body)
    }
  );
  router.get(
    "/:id",
    async(req,res)=>{
      const { id} = req.params
      if(!id){
        return res.status(404).json({message:'ID obrigatorio!'})
      }
    
     const response = await controller.findID(Number(id))
     const {statusCode,body} = response
     return res.status(statusCode).json(body)
    }
  );

  export default router 