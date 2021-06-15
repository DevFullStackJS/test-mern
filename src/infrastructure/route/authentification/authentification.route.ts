import { Router } from 'express';

import {
  authentificationRequestDTOSchema,
  authentificationSignoutRequestDTOSchema,
  boAuthentificationRequestDTOSchema,
  resetPasswordRequestDTOSchema,
} from '../../../constraint/validator/joi/authentification.validator';
import { utilisateurPasswordResetRequestDTOSchema } from '../../../constraint/validator/joi/utilisateur.validator';
import { schemaValidator } from '../../../service/middleware/joi';
import { responseFormatter } from '../../../service/middleware/response-formatter';
import { authentificationController } from '../../controller/authentification/authentification.controller';
import { boAuthentificationController } from '../../controller/bo-authentification/bo-authentification.controller';

const authentificationRoutes = () => {
  const router = Router();

  router.post(
    '/',
    schemaValidator(authentificationRequestDTOSchema),
    authentificationController.signin,
    // responseFormatter,
  );

  router.get(
    '/refreshToken/:refreshToken',
    authentificationController.getAccessTokenFromRefreshToken,
    // responseFormatter,
  );

  router
    .route('/reset-password')
    .put(
      schemaValidator(resetPasswordRequestDTOSchema),
      authentificationController.resetPassword,
      responseFormatter,
    )
    .post(
      schemaValidator(utilisateurPasswordResetRequestDTOSchema),
      authentificationController.passwordResetRequest,
      // responseFormatter,
    );

  router.get(
    '/verify-reset-token/:resetToken',
    authentificationController.verifyResetToken,
    // responseFormatter,
  );

  router.post(
    '/bo',
    schemaValidator(boAuthentificationRequestDTOSchema),
    boAuthentificationController.signIn,
  );

  router.post(
    '/signout',
    schemaValidator(authentificationSignoutRequestDTOSchema),
    authentificationController.signout,
  );

  return router;
};

export const authentificationRouter = authentificationRoutes();

/**
 * POST /api/authentification
 * @tags Authentification
 * @summary Se connecter à la plateforme
 * @param {AuthentificationRequestDTO} request.body.required
 * @return {AuthentificationResponseDTO} 200
 * @return {object} 400 - Mot de passe ou email éronné
 * @return {object} 500 - Erreur côté serveur
 */

/**
 * POST /api/authentification/signout
 * @tags Authentification
 * @summary Se déconnecter de la plateforme
 * @param {AuthentificationSignoutRequestDTO} request.body.required
 * @return {boolean} 200
 * @return {object} 400 - Mot de passe ou email éronné
 * @return {object} 500 - Erreur côté serveur
 */

/**
 * POST /api/authentification/bo
 * @tags Authentification
 * @summary Se connecter au BO
 * @param
 */

/**
 * GET /api/authentification/
 * @tags Authentification
 * @summary Générer un nouveau accessToken à partir du refreshToken
 * @param {string} refreshToken.path.required
 * @return {AuthentificationResponseDTO} 200
 * @return {object} 400 - Mot de passe ou email éronné
 * @return {object} 500 - Erreur côté serveur
 */

/**
 * POST /api/authentification/reset-password
 * @tags Authentification
 * @summary Demander une réinitialisation de mot de passe
 * @param {ResetPasswordRequestDTO} request.body.required
 * @return {boolean} 200
 * @return {object} 400 - Bad request
 * @return {object} 500 - Erreur interne du serveur
 */

/**
 * PUT /api/authentification/reset-password
 * @tags Authentification
 * @summary Valider le changement de mot de passe
 * @param {ResetPasswordConfirmRequestDTO} request.body.required
 * @return {boolean} 200
 * @return {object} 400
 * @return {object} 500 - Erreur interne du serveur
 */

/**
 * GET /api/authentification/verify-reset-token/
 * @tags Authentification
 * @summary Vérifier la validité du token de réinitialisation de mot de passe
 * @param {string} resetToken.path.required
 * @return {InscriptionResponseDTO} 200
 * @return {object} 500 - Erreur interne du serveur
 * @return {object} 400 - Lien de réinitialisation invalide
 */
