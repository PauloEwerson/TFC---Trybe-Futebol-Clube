import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const routes = Router();

const matchesController = new MatchesController();
routes.get('/', matchesController.getMatches);
routes.post('/', matchesController.createMatch);

export default routes;
