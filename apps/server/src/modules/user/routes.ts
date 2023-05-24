import { Router, response } from "express";
import { ensureAuthenticated } from "../../middleware/ensureAuthenticated";
import createUser from "./controllers/create";
import deleteUser from "./controllers/delete";
import getUser from "./controllers/get";
import updateUser from "./controllers/update"
import authenticateUser from "./controllers/authenticate";


const router = Router();

router
  .get("/:userId", ensureAuthenticated,(request, response) => {
    return getUser.handle(request, response);
  })
  .post("/", (request, response) => {
    return createUser.handle(request, response);
  })
  .post("/login", (request, response) => {
    return authenticateUser.handle(request, response);
  })
  .put("/:userId", (request, response) => {
    return updateUser.handle(request, response);
  })
  .delete("/:userId", ensureAuthenticated, (request, response) => {
    return deleteUser.handle(request, response);
  });

export default router;
