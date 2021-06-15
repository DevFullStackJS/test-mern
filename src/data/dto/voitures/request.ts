export interface VoituresRequestDTO {
  refVoitures: string;
  imageUrl: string;
  nom: string;
  description: string;
}

/**
 * @typedef {object} VoituresRequestDTO
 * @property {string} refVoitures.required
 * @property {string} imageUrl
 * @property {string} nom.required
 * @property {string} description
 */
