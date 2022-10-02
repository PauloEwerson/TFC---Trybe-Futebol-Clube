import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import authenticateLogin from '../middlewares/auth/login.Auth';
import tokenValidation from '../middlewares/token/login.token';

const routes = Router();

const loginController = new LoginController();
routes.post('/', authenticateLogin, loginController.login);
routes.get('/validate', tokenValidation, loginController.validate);

export default routes;
