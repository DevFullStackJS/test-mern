export interface ResetPasswordRequestDTO {
  email: string;
}

export interface ResetPasswordConfirmRequestDTO {
  id: string;
  password: string;
}

/**
 * @typedef {object} ResetPasswordRequestDTO
 * @property {string} email.required
 */

/**
 * @typedef {object} ResetPasswordConfirmRequestDTO
 * @property {string} id.required
 * @property {string} password.required
 */
