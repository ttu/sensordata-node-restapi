import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import defineRoutes from './api';
import Store from './store';
import initPassport from './passport';
// import ensureLogin from 'connect-ensure-login';

const env = process.env.NODE_ENV || "production";

const app = express();

app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

const store = new Store();

const authFunc = (username, password, done) => {
    if (username === "admin" && password === "admin")
        return done(null, { name: "admin" });

    return done(null, false, { message: 'Incorrect username.' });
};

const passport = initPassport(app, authFunc);

const authMiddleware = env === "development"
    ? (req, res, next) => next()
    : (req, res, next) => req.isAuthenticated() ? next() : res.sendStatus(401);
    //: ensureLogin.ensureLoggedIn();

const router = express.Router();
defineRoutes(router, store, passport, authMiddleware);

app.use('/api', router);

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
    console.log('Server started on port %s', server.address().port);
});