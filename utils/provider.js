
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../models/User.js";

export const connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URI,
      },
      async function (accessToken, refreshToken, profile, done) {
        console.log("inside callback function");
        const user = await User.findOne({
          googleId: profile.id,
        });

        if (!user) {
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            photo: profile.photos[0].value,
          });

          return done(null, newUser);
        } else {
          console.log(user);
          return done(null, user);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {

    console.log(id);
    const user = await User.findById(id);
    console.log(user);
    done(null, user);
  });
};