import * as Joi from 'joi';

export const administrateurRequestDTOSchema = Joi.object({
  nom: Joi.string(),
  prenom: Joi.string().allow(''),
  email: Joi.string().allow(''),
  adresseAdmin: Joi.string().allow(''),
  telAdmin: Joi.string().allow(''),
});
