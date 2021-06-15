import { configs } from '../../data/constants/configs';
import { HttpStatus } from '../../data/constants/http-status';
import { userSA } from '../../service/applicatif/user/user.sa';
import passport from '../../service/middleware/passport';
import { generateTokens, verifyToken } from '../../service/middleware/passport/passport-local';
import { passportStrategies } from '../../service/middleware/passport/passport-strategies';

class AuthController {
  signIn = (req, res, next) => {
    passport.authenticate(passportStrategies.local, { session: false }, (err, user) => {
      if (err && !user) {
        res.locals.statusCode = HttpStatus.BAD_REQUEST;
        next(err);
      } else {
        const { accessToken, refreshToken } = generateTokens(user);

        res.locals.data = {
          ...user,
          accessToken,
          refreshToken,
        };

        next();
      }
    })(req, res, next);
  };

  signUp = async (req, res, next) => {
    try {
      const user = await userSA.create(req.body);

      res.locals.data = user;
      res.locals.statusCode = HttpStatus.CREATED;

      next();
    } catch (error) {
      next(error);
    }
  };

  getAccessTokenFromRefreshToken = async (req, res, next) => {
    try {
      const {
        params: { refreshToken: providedRefreshToken },
      } = req;
      const user = await verifyToken(providedRefreshToken, configs.jwtSecret);
      const { accessToken, refreshToken } = generateTokens(user);

      res.locals.data = {
        ...user,
        accessToken,
        refreshToken,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new AuthController();
