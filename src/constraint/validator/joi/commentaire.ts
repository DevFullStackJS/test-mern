import * as Joi from 'joi';

export const commentaireRequestDTOSchema = Joi.object({
  commentaire: Joi.string().required(),
  owner: Joi.string().required(),
});
