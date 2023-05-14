import { Router } from "express";
import createUser from "../useCases/user/createUser";
import getUser from "../useCases/user/getUser";
import authenticateUser from "../useCases/user/authenticateUser";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = Router();

router
  .get("/:id", ensureAuthenticated,(request, response) => {
    return getUser.handle(request, response);
  })
  .post("/", (request, response) => {
    return createUser.handle(request, response);
  })
  .post("/login", (request, response) => {
    return authenticateUser.handle(request, response);
  });

export default router;
