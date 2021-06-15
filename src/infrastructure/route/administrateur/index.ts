import { genericRoute } from '../../../common/infrastructure/generic.route';
import { administrateurRequestDTOSchema } from '../../../constraint/validator/joi/administrateur';
import { administrateurController } from '../../controller/administrateur';

const administrateurRoutes = () => genericRoute({ controller: administrateurController, schema: administrateurRequestDTOSchema });

export const administrateurRouter = administrateurRoutes();

/**
 * POST /api/administrateur
 * @tags Administrateur
 * @summary Créer un administrateur
 * @param {AdministrateurRequestDTO} request.body.required
 * @return {AdministrateurResponseDTO} 201
 * @return {object} 400 - Données non conformes
 * @return {object} 500 - Erreur interne du serveur
 */

/**
 * PUT /api/administrateur
 * @tags Administrateur
 * @summary Modification d'un administrateur
 * @param {AdministrateurRequestDTO} request.body.required
 * @return {AdministrateurResponseDTO} 200
 * @return {object} 400 - Données non conformes
 * @return {boolean} 500 - Erreur interne du serveur
 */

/**
 * DELETE /api/administrateur/{id}
 * @tags Administrateur
 * @summary Supprimer un administrateur
 * @param {string} id.path.required
 * @return {string} 200
 * @return {object} 500 - Erreur côté serveur
 */

/**
 * GET /api/administrateur
 * @tags Administrateur
 * @summary Liste des administrateur
 * @param {number} page.query
 * @param {number} rowPerPage.query
 * @return {array<AdministrateurResponseDTO>} 200
 * @return {object} 400 - Données non conformes
 * @return {object} 500 - Erreur interne du serveur
 */

/**
 * GET /api/administrateur/{id}
 * @tags Administrateur
 * @summary Get By Id
 * @param {string} id.path.required
 * @return {AdministrateurResponseDTO} 200
 * @return {object} 500 - Erreur côté serveur
 */

/**
 * GET /api/administrateur/count
 * @tags Administrateur
 * @summary Nombre des administrateurs
 * @return {number} 200
 * @return {object} 500 - Erreur interne du serveur
 */
