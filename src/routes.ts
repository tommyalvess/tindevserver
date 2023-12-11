import express from 'express';

import DevController from './controllers/DevController';
import DislikeController from './controllers/DislikeController';
import LikeController from './controllers/LikeController';

const routes = express.Router();

const devController = new DevController()
const likeController = new LikeController()
const dislikeController = new DislikeController()

routes.get('/devs', devController.index);
routes.post('/devs', devController.store);

routes.post('/devs/:devId/likes', likeController.store);
routes.post('/devs/:devId/dislikes', dislikeController.store);

export default routes;