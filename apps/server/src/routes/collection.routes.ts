import { Router } from 'express';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';
import createCollection from '../useCases/collection/createCollection';
import getCollection from '../useCases/collection/getCollection';
import deleteColleciton from '../useCases/collection/deleteCollection'

const router = Router();

router
.post('/', ensureAuthenticated ,(req, res) => {
    return createCollection.handle(req,res);
})
.get('/', ensureAuthenticated, (req, res) => {
    return getCollection.handle(req, res);
})
.delete('/',ensureAuthenticated, (req, res) => {
    return deleteColleciton.handle(req,res)
})

export default router;