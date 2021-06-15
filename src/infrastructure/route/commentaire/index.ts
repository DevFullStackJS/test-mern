import { genericRoute } from '../../../common/infrastructure/generic.route';
import { commentaireRequestDTOSchema } from '../../../constraint/validator/joi/commentaire';
import { commentaireController } from '../../controller/commentaire';

const commentaireRoutes = () => genericRoute({ controller: commentaireController, schema: commentaireRequestDTOSchema });

export const commentaireRouter = commentaireRoutes();

/**
 * POST /api/commentaire
 * @tags Commentaire
 * @summary Créer un commentaire
 * @security BearerAuth
 * @param {CommentaireRequestDTO} request.body.required
 * @return {CommentaireResponseDTO} 201
 * @return {object} 400 - Données non conformes
 * @return {object} 500 - Erreur interne du serveur
 */

/**
 * PUT /api/commentaire
 * @tags Commentaire
 * @security BearerAuth
 * @summary Modification d'un commentaire
 * @param {CommentaireRequestDTO} request.body.required
 * @return {CommentaireResponseDTO} 200
 * @return {object} 400 - Données non conformes
 * @return {boolean} 500 - Erreur interne du serveur
 */

/**
 * DELETE /api/commentaire/{id}
 * @tags Commentaire
 * @security BearerAuth
 * @summary Supprimer un commentaire
 * @param {string} id.path.required
 * @return {string} 200
 * @return {object} 500 - Erreur côté serveur
 */

/**
 * GET /api/commentaire
 * @tags Commentaire
 * @summary Liste des commentaire
 * @security BearerAuth
 * @param {number} page.query
 * @param {number} rowPerPage.query
 * @return {array<CommentaireResponseDTO>} 200
 * @return {object} 400 - Données non conformes
 * @return {object} 500 - Erreur interne du serveur
 */

/**
 * GET /api/commentaire/{id}
 * @tags Commentaire
 * @security BearerAuth
 * @summary Get By Id
 * @param {string} id.path.required
 * @return {CommentaireResponseDTO} 200
 * @return {object} 500 - Erreur côté serveur
 */

/**
 * GET /api/commentaire/count
 * @tags Commentaire
 * @security BearerAuth
 * @summary Nombre des commentaires
 * @return {number} 200
 * @return {object} 500 - Erreur interne du serveur
 */
