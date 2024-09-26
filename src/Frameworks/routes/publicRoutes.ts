// routes/userRoutes.js
import { Router } from "express";
import CoversController from "../Controllers/CoversOfMonth";
import { CategoriesController } from "../Controllers/Admin/Categories/index";


import { checkingTokenValidation } from "../Middleware";
import { MagazineController } from "../Controllers/Admin/Magazines";

import { GetArticlesController } from "../Controllers/Public/Articles";
import { constants } from "buffer";
import { SponsorsController } from "../Controllers/Admin/Sponsors";
import { EventsController } from "../Controllers/Admin/Events";
const path = require("path");
const router = Router();
const magazines = new MagazineController();
const sponsors = new SponsorsController()
const events =  new EventsController()
const articlesController = new GetArticlesController();
// Public routes
router.get("/magazines/views", async (req, res) =>{});



router.get("/magazine/:id", async (req, res) =>{
   const { id} = req.params
  const response  = await magazines.findIDPublic(Number(id))
   const {  statusCode,body} = response
   return res.status(statusCode).json(body)
}
  
);
router.get("/last-magazines", async (req, res) =>
 {}
);


//Rotas de Artigos Public
router.get("/article/:slug", async (req, res) => {
  const { slug } = req.params;
  const response = await articlesController.getArticleID(slug);
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
router.get("/articles-most-read", async (req, res) => {
  const response = await articlesController.getArticlesMostRead();
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
router.get("/articles-recommended", async (req, res) => {
  const response = await articlesController.getArticlesRecommended();

  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});

router.get("/articles-most-views", async (req, res) => {
  const response = await articlesController.getAarticlesMostView();
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
router.get("/articles-trend", async (req, res) => {
  const response = await articlesController.getAarticlesTrend();
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});
router.get("/articles-free", async (req, res) => {
  const response = await articlesController.getAarticlesFree();
  const { body, statusCode } = response;
  return res.status(statusCode).json(body);
});


// Articles end

//Events
router.get("/events",async(req,res)=>{
  const response = await events.findAll(req.query)
  const {body,statusCode} = response
  return res.status(statusCode).json(body)
});

router.get("/event/:id", async(req,res)=>{
  const {id} = req.params
  if(!id){
    return res.status(404).json({message:"ID Obrigatorio!"})
  }
  const response = await events.findID(Number(id))
  const {body,statusCode} = response
  return res.status(statusCode).json(body)
});

//Events end

//Sponsors
router.get("/sponsors", async (req,res)=>{
  const response = await sponsors.getAllSponsors()
  const {body,statusCode} = response
  return res.status(statusCode).json(body)
});
//Sponsors End
router.get("/validate-token", checkingTokenValidation);

export default router;
