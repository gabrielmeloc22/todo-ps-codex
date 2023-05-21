import { Router } from 'express';
import createCollection from './controllers/create';
import getCollection from './controllers/get';
import deleteColleciton from './controllers/delete';

const router = Router();

router
.post('/' ,(req, res) => {
    return createCollection.handle(req,res);
})
.get('/', (req, res) => {
    return getCollection.handle(req, res);
})
.delete('/', (req, res) => {
    return deleteColleciton.handle(req,res)
})

export default router;