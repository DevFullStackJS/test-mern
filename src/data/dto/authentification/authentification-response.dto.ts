export interface AuthentificationResponseDTO {
  id: string;
  nom: string;
  prenom: string;
  imageUrl: string;
  telephone: string;
  email: string;
  ville: string;
  adresse: string;
  accessToken: string;
  refreshToken: string;
}

/**
 * @typedef {object} AuthentificationResponseDTO
 * @property {InscriptionResponseDTO} utilisateur
 * @property {string} accessToken
 * @property {string} refreshToken
 */
