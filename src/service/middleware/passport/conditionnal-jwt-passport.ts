import passport from '.';
import { HttpStatus } from '../../../data/constants/http-status';
import { Exception } from '../exception-handler';
import { passportStrategies } from './passport-strategies';

const errorMessage = {
  TokenExpiredError: 'Token expiré',
};

export const conditionnalJwtPassport = (isSecured: boolean) => (req, res, next) =>
  isSecured
    ? passport.authenticate(passportStrategies.jwt, { session: false }, (err, user, info) => {
      const { method, baseUrl } = req;
        if((method === 'GET' || method === 'get') && baseUrl === '/api/voitures') {
          req.user = {};
          return next();
        }
        console.log({ req });
        if (err) {
          res.locals.statusCode = HttpStatus.UNAUTHORIZED;
          return next(err);
        }

        if (!user && info) {
          const { message, name } = info;

          return next(new Exception(HttpStatus.UNAUTHORIZED, errorMessage[name] || message));
        }

        req.user = user;

        return next();
      })(req, res, next)
    : next();
