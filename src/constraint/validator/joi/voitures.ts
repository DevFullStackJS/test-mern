import * as Joi from 'joi';

export const voituresRequestDTOSchema = Joi.object({
  refVoitures: Joi.string(),
  imageUrl: Joi.string(),
  nom: Joi.string(),
  description: Joi.string(),
});
