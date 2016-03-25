import passport from 'passport';
import passportLocal from 'passport-local';

export default (app, authFunc) => {

    passport.use(new passportLocal.Strategy(authFunc));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    return passport;
};