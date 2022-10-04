import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const routes = Router();

const leaderboardController = new LeaderboardController();
routes.get('/home', leaderboardController.getLeaderboard);

export default routes;
