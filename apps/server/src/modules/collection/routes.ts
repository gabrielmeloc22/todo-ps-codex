import { Router } from 'express';
import createCollection from './controllers/create';
import getCollection from './controllers/get';
import deleteColleciton from './controllers/delete';
import updateCollection from './controllers/update'

const router = Router();

router
.post('/' ,(request, response) => {
    return createCollection.handle(request, response);
})
.get('/:authorId/:collectionId', (request, response) => {
    return getCollection.handle(request, response);
})
.put('/:authorId/:collectionId/', (request, response)=> {
    return updateCollection.handle(request, response);
})
.delete('/:authorId/:collectionId', (request, response) => {
    return deleteColleciton.handle(request, response)
})

export default router;