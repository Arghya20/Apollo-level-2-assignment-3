import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User, { IUser } from '../models/user';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'phoneNumber',
    },
    async (phoneNumber, password, done) => {
      try {
        const user = await User.findOne({ phoneNumber });

        if (!user) {
          return done(null, false, { message: 'Incorrect phone number' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
