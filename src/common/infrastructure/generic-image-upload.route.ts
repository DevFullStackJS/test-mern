import { Router } from 'express';
import { schemaValidator } from '../../service/middleware/joi';

import { imageUpload } from '../../service/middleware/multer';
import { conditionnalJwtPassport } from '../../service/middleware/passport/conditionnal-jwt-passport';
import { responseFormatter } from '../../service/middleware/response-formatter';
import { genericRoute, RouteOption } from './generic.route';

const genericImageUploadRoutes = (option: RouteOption) => {
  const { controller, ...restOption } = option;
  const { isSecured, schema } = restOption;
  const router = Router();

  router.post(
    '/',
    imageUpload.single('image'),
    conditionnalJwtPassport(isSecured),
    schemaValidator(schema),
    controller.create,
    responseFormatter,
  );

  router.put(
    '/',
    imageUpload.single('image'),
    conditionnalJwtPassport(isSecured),
    schemaValidator(schema),
    controller.update,
    responseFormatter,
  );

  return genericRoute({ ...restOption, controller, router });
};

export const genericImageUploadRouter = (option: RouteOption) => genericImageUploadRoutes(option);
