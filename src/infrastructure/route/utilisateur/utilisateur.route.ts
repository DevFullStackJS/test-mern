import { Router } from 'express';
import {
  utilisateurEditRequestDTOSchema,
  utilisateurStatusRequestDTOSchema,
  utilisateurEditBORequestDTOSchema,
} from '../../../constraint/validator/joi/utilisateur.validator';
import { schemaValidator } from '../../../service/middleware/joi';
import { imageUpload } from '../../../service/middleware/multer';
// import { conditionnalJwtPassport } from '../../../service/middleware/passport/conditionnal-jwt-passport';
import { utilisateurController } from '../../controller/utilisateur/utilisateur.controller';

const utilisateurRoutes = () => {
  const router = Router();

  router.put(
    '/profil',
    // conditionnalJwtPassport(true),
    // imageUpload.fields({'image'}),
    imageUpload.fields([
      { name: 'image', maxCount: 1 },
    ]),
    schemaValidator(utilisateurEditRequestDTOSchema),
    utilisateurController.editUtilisateur,
  );

  router.put(
    '',
    imageUpload.single('image'),
    schemaValidator(utilisateurEditBORequestDTOSchema),
    utilisateurController.editUtilisateurBO,
  );

  router.put(
    '/status',
    schemaValidator(utilisateurStatusRequestDTOSchema),
    utilisateurController.changeUtilisateurStatus,
  );

  router.get('', utilisateurController.getAll);

  router.get('/:id', utilisateurController.getById);

  return router;
};

export const utilisateurRouter = utilisateurRoutes();

/**
 * PUT /api/utilisateur
 * @tags Utilisateur
 * @summary Modifier un utilisateur
 * @param {UtilisateurEditBORequestDTO} request.body.required - multipart/form-data
 * @return {boolean} 200
 * @return  {object} 500 - Erreur côté serveur
 */

/**
 * PUT /api/utilisateur/profil
 * @tags Utilisateur
 * @security BearerAuth
 * @summary Modifier les informations sur un utilisateur
 * @param {UtilisateurEditRequestDTO} request.body.required - multipart/form-data
 * @return {boolean} 200
 * @return  {object} 500 - Erreur côté serveur
 */

/**
 * PUT /api/utilisateur/status
 * @tags Utilisateur
 * @summary Modifier le statut d'un utlisateur actif ou non
 * @param {UtilisateurStatusRequestDTO} request.body.required
 * @return {boolean} 200
 * @return {object} 500 - Erreur côté serveur
 * @return {object} 400 - Données non conforme
 */

/**
 * GET /api/utilisateur
 * @tags Utilisateur
 * @summary Liste des utilisateurs
 * @param {number} page.query
 * @param {number} rowPerPage.query
 * @return {array<UtilisateurResponseDTO>} 200
 * @return {object} 500 - Erreur côté serveur
 * @return {object} 400 - Données non conforme
 */

/**
 * GET /api/utilisateur/
 * @tags Utilisateur
 * @summary Récupérer un utilisateur par son id
 * @param {string} id.path.required
 * @return {UtilisateurResponseBODTO} 200
 * @return {object} 500 - Erreur côté serveur
 * @return {object} 400 - Données non conforme
 */
