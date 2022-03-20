import { Express } from "express";
import session from "express-session";
import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import renderReactApp from "server/utils/renderReactApp";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "server/utils/secrets";
import { getOrigin } from "server/utils/url";

// https://www.loginradius.com/blog/async/google-authentication-with-nodejs-and-passportjs/
export default (app: Express) => {
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: "SECRET",
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );


  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/login", async (req, res) => {
    const html = await renderReactApp(req);
    return res.send(html);  
  });

  app.get("/login/success", (req, res) => {
    return res.redirect('/')
  });
  app.get("/login/error", (req, res) => res.send("error logging in"));

  app.get(
    "/auth/google", 
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login/error",
    }),
    function (req, res) {
      // Successful authentication, redirect success.
      res.redirect("/login/success");
    }
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj: Express.User, cb) {
    cb(null, obj);
  });
};
