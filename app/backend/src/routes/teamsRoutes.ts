import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const routes = Router();

const teamsController = new TeamsController();
routes.get('/', teamsController.getTeams);

export default routes;
