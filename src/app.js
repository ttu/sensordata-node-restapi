import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import socketio from 'socket.io';
import moment from 'moment';

import defineRoutes from './api';
import Store from './store';
import initPassport from './passport';
// import ensureLogin from 'connect-ensure-login';

const env = process.env.NODE_ENV || "production";

const app = express();
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'sensor-key-data', resave: false, saveUninitialized: false }));

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
app.use(express.static('./public'));

// Use Swagger UI only in dev
if (env === "development") {
    app.use('/api_docs', express.static('./api_docs'));
    app.use('/swagger', express.static('./node_modules/swagger-ui/dist'));
}

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
    console.log('Server started on port %s', server.address().port);
});

const io = socketio(server);

io.on('connection', (socket) => {
    console.log('a socket connected');
});

let checkTime = moment();

setInterval(async () => {
    // TODO: Get only new statuses from db
    const statuses = await store.getSensorStatuses();
    const newStatuses = statuses.filter(s => moment(s.MeasurementTime).isAfter(checkTime));
    newStatuses.forEach(s => {
        io.emit('message', `${s.SensorId} - ${s.Temperature}`);
    });
    checkTime = moment();
}, 15000);