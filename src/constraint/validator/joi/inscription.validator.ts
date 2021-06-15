import * as Joi from 'joi';
import { regexPatternValidator } from '../regex-pattern.validator';

export const inscriptionRequestDTOSchema = Joi.object({
  nom: Joi.string().max(50).required(),
  prenom: Joi.string().max(100),
  telephone: Joi.string().allow(''),
  // telephone: Joi.string().pattern(regexPatternValidator.phone),
  email: Joi.string().email().required(),
  ville: Joi.string().max(25).required(),
  adresse: Joi.string().max(50).required(),
  password: Joi.string().required().regex(regexPatternValidator.password),
});
