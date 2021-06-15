import { Router } from 'express';

import { utilisateurRouter } from './utilisateur/utilisateur.route';
import { voituresRouter } from './voitures';
import { administrateurRouter } from './administrateur';
import { commentaireRouter } from './commentaire';
import { authentificationRouter } from './authentification/authentification.route';
import { inscriptionRouter } from './inscription/inscription.route';
import { conditionnalJwtPassport } from '../../service/middleware/passport/conditionnal-jwt-passport';
import { HttpStatus } from '../../data/constants/http-status';

const appRoutes = () => {
  const router = Router();
  const secured = conditionnalJwtPassport(true);

  router.get('/api-status', (req, res) => res.status(HttpStatus.OK).send('ok'));
  router.use('/utilisateur', utilisateurRouter);
  router.use('/authentification', authentificationRouter);
  router.use('/inscription', inscriptionRouter);
  router.use('/voitures', voituresRouter);
  router.use('/administrateur', administrateurRouter);
  router.use('/commentaire', secured, commentaireRouter);
  
  return router;
};

export const appRouter = appRoutes();
