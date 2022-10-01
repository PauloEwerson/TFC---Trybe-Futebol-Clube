import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const routes = Router();

const loginController = new LoginController();
routes.post('/', loginController.login);

export default routes;
