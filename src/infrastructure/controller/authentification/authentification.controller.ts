import { configs } from '../../../data/constants/configs';
import { HttpStatus } from '../../../data/constants/http-status';
import { authentificationSA } from '../../../service/applicatif/authentification/authentification.sa';
import passport from '../../../service/middleware/passport';
import { generateTokens, verifyToken } from '../../../service/middleware/passport/passport-local';
import { passportStrategies } from '../../../service/middleware/passport/passport-strategies';


export class AuthentificationController {
  serviceSA = authentificationSA;

  signout = async (req, res, next) => {
    try {
      const {
        body: { deviceToken },
      } = req;

      res.locals.data = true;

      next();
    } catch (error) {
      next(error);
    }
  };

  signin = (req, res, next) => {
    const {
      body: { token },
    } = req;
    passport.authenticate(passportStrategies.local, { session: false }, async (err, user) => {
      console.log(err);
      if (err && !user) {
        res.locals.statusCode = HttpStatus.BAD_REQUEST;
        next(err);
      } else {
        try {
          const { accessToken, refreshToken } = generateTokens(user);

          res.locals.data = {
            accessToken,
            refreshToken,
            deviceToken: token,
            utilisateur: { ...user },
          };

          next();
        } catch (error) {
          next(error);
        }
      }
    })(req, res, next);
  };

  getAccessTokenFromRefreshToken = async (req, res, next) => {
    try {
      const {
        params: { refreshToken: providedRefreshToken },
      } = req;
      const user = await verifyToken(providedRefreshToken, configs.jwtSecret);
      const { accessToken, refreshToken } = generateTokens(user);

      res.locals.data = {
        accessToken,
        refreshToken,
        utilisateur: { ...user },
      };

      next();
    } catch (error) {
      next(error);
    }
  };

  passwordResetRequest = async (req, res, next) => {
    try {
      const {
        body: { email },
      } = req;

      await this.serviceSA.passwordResetRequest(email, `http://${req.headers.host}`);

      res.locals.data = true;

      next();
    } catch (error) {
      next(error);
    }
  };

  verifyResetToken = async (req, res, next) => {
    try {
      const {
        params: { resetToken },
      } = req;
      const { dateInscription, dateDerniereConnexion, ...verified } = await verifyToken(
        resetToken,
        configs.passwordResetSecret,
      );

      res.locals.data = verified;

      next();
    } catch (error) {
      res.locals.statusCode = HttpStatus.BAD_REQUEST;

      next({ message: 'Lien de réinitialisation invalide' });
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const {
        body: { id, password },
      } = req;

      await this.serviceSA.resetPassword(id, password);

      res.locals.data = true;

      next();
    } catch (error) {
      next(error);
    }
  };
}

export const authentificationController = new AuthentificationController();
