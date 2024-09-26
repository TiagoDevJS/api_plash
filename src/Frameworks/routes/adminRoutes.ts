// routes/adminRoutes.js
import { Router } from "express";
import { chekingTokenAdmin } from "../Middleware";

import AdminDvlController from "../Controllers/DVL";


import { AdminUserController } from "../Controllers/User";
import AdminControllerEventCover from "../Controllers/CoversOfMonth";


import { CloudStorageService } from "../service/cloudStorage";
import { AdminComissionController } from "../Controllers/Comission";



const router = Router();




//         ###################################### ///

//Dvls


//         ###################################### ///

// Comission
router.get(
  "/last-comission",
  chekingTokenAdmin,
  AdminComissionController.getLastCommission
);
router.get(
  "/employee/commision/:slug",
  chekingTokenAdmin,
  AdminComissionController.getComissionEmployee
);
router.post(
  "/employee/commision/update/:slug",
  chekingTokenAdmin,
  AdminComissionController.updateComissionEmployee
);
//         ###################################### ///
//Users

router.get("/users", AdminUserController.getAllUsers);
router.get(
  "/users/:slug",
  chekingTokenAdmin,
  AdminUserController.getOneUserAdmin
);
router.get("/last-users", chekingTokenAdmin, AdminUserController.getLastUsers);

//Route para pagar o usuario de forma unica
router.post(
  "/user/finance/:slug",
  chekingTokenAdmin,
  AdminUserController.updateDvlUser
);



//Events ofCovers
router.get(
  "/covers",
  chekingTokenAdmin,
  AdminControllerEventCover.getAllCoverEventsAdmin
);
router.post(
  "/create-event-cover",
  chekingTokenAdmin,
  AdminControllerEventCover.createEventCover
);
router.delete(
  "/delet-event-cover/:slug",
  chekingTokenAdmin,
  AdminControllerEventCover.deletEvent
);
//         ###################################### ///

//Banners


export default router;
