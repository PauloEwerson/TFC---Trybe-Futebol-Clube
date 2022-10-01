import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import authenticateLogin from '../middlewares/auth/login.Auth';

const routes = Router();

const loginController = new LoginController();
routes.post('/', authenticateLogin, loginController.login);

export default routes;
