export interface VoituresResponseDTO {
  id: string;
  refVoitures: string;
  imageUrl: string;
  nom: string;
  description: string;
}

/**
 * @typedef {object} VoituresResponseDTO
 * @property {string} id
 * @property {string} refVoitures.required
 * @property {string} imageUrl
 * @property {string} nom.required
 * @property {string} description
 */
