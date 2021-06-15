import * as passport from 'passport';

import { jwtStrategy, localStrategy } from './passport-local';
import { passportStrategies } from './passport-strategies';

passport.use(jwtStrategy);
passport.use(localStrategy);

export default passport;
