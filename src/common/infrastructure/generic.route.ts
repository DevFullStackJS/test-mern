import { Router } from 'express';
import * as Joi from 'joi';
import { schemaValidator } from '../../service/middleware/joi';

import { conditionnalJwtPassport } from '../../service/middleware/passport/conditionnal-jwt-passport';
import { responseFormatter } from '../../service/middleware/response-formatter';

export type RouteOption = {
  controller: any;
  schema?: Joi.Schema;
  router?: Router;
  isSecured?: boolean;
};

export const genericRoute = (option: RouteOption) => {
  const { controller, isSecured = false, router = Router(), schema = null } = option;

  router
    .route('/')
    .get(conditionnalJwtPassport(isSecured), controller.findAll, responseFormatter)
    .post(
      conditionnalJwtPassport(isSecured),
      schemaValidator(schema),
      controller.create,
      responseFormatter,
    )
    .put(
      conditionnalJwtPassport(isSecured),
      schemaValidator(schema),
      controller.update,
      responseFormatter,
    );

  router.get('/findOne', conditionnalJwtPassport(isSecured), controller.findOne, responseFormatter);

  router
    .route('/:id')
    .get(conditionnalJwtPassport(isSecured), controller.findById, responseFormatter)
    .delete(conditionnalJwtPassport(isSecured), controller.delete, responseFormatter);

  router.put(
    '/partialUpdate/:id',
    conditionnalJwtPassport(isSecured),
    controller.partialUpdate,
    responseFormatter,
  );

  return router;
};
