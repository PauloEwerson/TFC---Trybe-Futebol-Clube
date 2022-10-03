import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import { authMatch, authTeam } from '../middlewares/auth/match.Auth';
import authToken from '../middlewares/auth/tokenAuth';

const routes = Router();

const matchesController = new MatchesController();
routes.get('/', matchesController.getMatches);
routes.post(
  '/',
  authToken,
  authMatch,
  authTeam,
  matchesController.createMatch,
);
routes.patch('/:id/finish', matchesController.patchMyMatch);
routes.patch('/:id', matchesController.updateMatch);

export default routes;
