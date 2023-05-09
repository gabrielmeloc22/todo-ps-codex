import { Router } from "express";
import createUser from "../useCases/user/createUser";
import getUser from "../useCases/user/getUser"

const router = Router();

router
.get('/:id', (request, response) => {
    return getUser.handle(request, response);
})
.post('/', (request, response) => {
    return createUser.handle(request, response);
})

export default router;