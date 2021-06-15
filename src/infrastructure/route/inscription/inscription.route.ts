import { Router } from 'express';

import { schemaValidator } from '../../../service/middleware/joi';
import { inscriptionRequestDTOSchema } from '../../../constraint/validator/joi/inscription.validator';
import { inscriptionController } from '../../controller/inscription/inscription.controller';
import { responseFormatter } from '../../../service/middleware/response-formatter';

const inscriptionRoutes = () => {
  const router = Router();

  router.post(
    '/',
    schemaValidator(inscriptionRequestDTOSchema),
    inscriptionController.signup,
    responseFormatter,
  );

  return router;
};

export const inscriptionRouter = inscriptionRoutes();

/**
 * POST /api/inscription
 * @tags Inscription
 * @summary Créer un nouveau compte d'utilisateur
 * @param {InscriptionRequestDTO} request.body.required - multipart/form-data
 * @return {InscriptionResponseDTO} 201 - Utilisateur créé
 * @return {object} 400 - Bad request
 * @return {object} 500
 */
