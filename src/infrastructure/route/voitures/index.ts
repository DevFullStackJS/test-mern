import { genericRoute } from '../../../common/infrastructure/generic.route';
import { voituresRequestDTOSchema } from '../../../constraint/validator/joi/voitures';
import { voituresController } from '../../controller/voitures';

const voituresRoutes = () => genericRoute({ controller: voituresController, schema: voituresRequestDTOSchema });

export const voituresRouter = voituresRoutes();

/**
 * POST /api/voitures
 * @tags Voitures
 * @summary Créer un voitures
 * @security BearerAuth
 * @param {VoituresRequestDTO} request.body.required
 * @return {VoituresResponseDTO} 201
 * @return {object} 400 - Données non conformes
 * @return {object} 500 - Erreur interne du serveur
 */

/**
 * PUT /api/voitures
 * @tags Voitures
 * @summary Modification d'un voitures
 * @security BearerAuth
 * @param {VoituresRequestDTO} request.body.required
 * @return {VoituresResponseDTO} 200
 * @return {object} 400 - Données non conformes
 * @return {boolean} 500 - Erreur interne du serveur
 */

/**
 * DELETE /api/voitures/{id}
 * @tags Voitures
 * @security BearerAuth
 * @summary Supprimer un voitures
 * @param {string} id.path.required
 * @return {string} 200
 * @return {object} 500 - Erreur côté serveur
 */

/**
 * GET /api/voitures
 * @tags Voitures
 * @summary Liste des voitures
 * @param {number} page.query
 * @param {number} rowPerPage.query
 * @return {array<VoituresResponseDTO>} 200
 * @return {object} 400 - Données non conformes
 * @return {object} 500 - Erreur interne du serveur
 */

/**
 * GET /api/voitures/{id}
 * @tags Voitures
 * @summary Get By Id
 * @param {string} id.path.required
 * @return {VoituresResponseDTO} 200
 * @return {object} 500 - Erreur côté serveur
 */

/**
 * GET /api/voitures/count
 * @tags Voitures
 * @security BearerAuth
 * @summary Nombre des voituress
 * @return {number} 200
 * @return {object} 500 - Erreur interne du serveur
 */
