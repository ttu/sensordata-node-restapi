import passport from 'passport';
import passportLocal from 'passport-local';
import http from 'passport-http';

import config from './config';

const authConstructor = config.auth == 'local' ? passportLocal.Strategy : http.BasicStrategy;

export default (app, authFunc) => {

    passport.use(new authConstructor(authFunc));

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