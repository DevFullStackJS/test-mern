import * as jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { configs } from '../../../data/constants/configs';
import { authentificationSA } from '../../applicatif/authentification/authentification.sa';
import { utilisateurSM } from '../../metier/utilisateur/utilisateur.sm';
import { Exception } from '../exception-handler';
import { HttpStatus } from '../../../data/constants/http-status';

export const verifyToken = (token: string, secret: string): Promise<any> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, readable) => {
      if (!error && readable) {
        const { iat, exp, ...rest } = readable;
        resolve(rest);
      } else {
        reject(error);
      }
    });
  });

export const generateResetToken = (user) =>
  jwt.sign(user, configs.passwordResetSecret, { expiresIn: configs.passwordResetExpiration });

export const generateTokens = (user) => {
  const accessToken = jwt.sign(user, configs.jwtSecret, { expiresIn: configs.jwtExpiration });
  const refreshToken = jwt.sign(user, configs.jwtSecret, {
    expiresIn: configs.jwtRefreshTokenExpiration,
  });

  return { accessToken, refreshToken };
};

export const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await authentificationSA.findByEmail(email);
      console.log({ email, password });
      const validPassword = authentificationSA.validatePassword(password, user.password);
      const { password: pwd, ...withoutPassword } = user;
      
      if (validPassword) {
        await utilisateurSM.update(withoutPassword.id, { dateDerniereConnexion: new Date() });

        done(null, withoutPassword);
      } else {
        done({ message: 'Mot de passe invalide' });
      }
    } catch (error) {
      const { message = '' } = error || {};
      if (message.includes('matching')) {
        done({ message: 'Email non trouvé dans la base ou utilisateur inactif' });
      } else {
        done(error);
      }
    }
  },
);

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: configs.jwtSecret,
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken()]),
  },
  async (jwtPayload, done) => {
    try {
      if (jwtPayload.accessToken) {
        done(null, jwtPayload);
      } else {
        const user = await authentificationSA.findById(jwtPayload.id);

        if (user) {
          done(null, user);
        } else {
          done(new Exception(HttpStatus.BAD_REQUEST, 'Invalid token'));
        }
      }
    } catch (error) {
      done(error);
    }
  },
);
