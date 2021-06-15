export interface UtilisateurEditRequestDTO {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  imageUrl: string;
  email: string;
  ville: string;
  adresse: string;
  dateNaissance: string;
}

/**
 * @typedef {object} UtilisateurEditRequestDTO
 * @property {string} id.required
 * @property {string} telephone.required
 * @property {string} email.required
 * @property {string} ville.required
 * @property {string} adresse.required
 * @property {string} imageUrl
 */

/**
 * @typedef {object} UtilisateurEditBORequestDTO
 * @property {string} id.required
 * @property {string} nom.required
 * @property {string} prenom.required
 * @property {string} telephone.required
 * @property {string} email.required
 * @property {string} ville.required
 * @property {string} adresse.required
 * @property {string} imageUrl
 */
