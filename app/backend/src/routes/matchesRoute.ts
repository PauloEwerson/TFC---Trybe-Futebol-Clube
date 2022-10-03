import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import { authMatch, authTeam } from '../middlewares/auth/match.Auth';

const routes = Router();

const matchesController = new MatchesController();
routes.get('/', matchesController.getMatches);
routes.post(
  '/',
  authMatch,
  authTeam,
  matchesController.createMatch,
);
routes.patch('/:id/finish', matchesController.patchMyMatch);
export default routes;
