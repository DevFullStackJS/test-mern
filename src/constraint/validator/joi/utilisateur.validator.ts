import * as Joi from 'joi';
import { regexPatternValidator } from '../regex-pattern.validator';

export const utilisateurRequestDTOSchema = Joi.object({
  id: Joi.string(),
  nom: Joi.string().max(50).required(),
  prenom: Joi.string().max(100),
  telephone: Joi.string().pattern(regexPatternValidator.phone),
  email: Joi.string().email().required(),
  ville: Joi.string().max(25).required(),
  adresse: Joi.string().max(50).required(),
  password: Joi.string().min(6),
});

export const utilisateurEditRequestDTOSchema = Joi.object({
  id: Joi.string().required(),
  // nom: Joi.string().max(50).required(),
  // prenom: Joi.string().max(100),
  telephone: Joi.string().pattern(regexPatternValidator.phone),
  email: Joi.string().email().required(),
  ville: Joi.string().max(25).required(),
  adresse: Joi.string().max(50).required(),
});

export const utilisateurEditBORequestDTOSchema = Joi.object({
  id: Joi.string().required(),
  nom: Joi.string().max(50).required(),
  prenom: Joi.string().max(100),
  telephone: Joi.string().pattern(regexPatternValidator.phone),
  email: Joi.string().email().required(),
  ville: Joi.string().max(25).required(),
  adresse: Joi.string().max(50).required(),
});

export const utilisateurPasswordResetRequestDTOSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const utilisateurStatusRequestDTOSchema = Joi.object({
  id: Joi.string().required(),
  actif: Joi.boolean().required(),
});
