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
import config from './config';
import logger from './logger';

const env = process.env.NODE_ENV || "production";
const auth = process.env.AUTH || "on";

const app = express();

app.use((req, res, next) => {
    req.logger = logger;
    next();
});

app.use(require("morgan")("combined", { "stream": logger.stream }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'sensor-key-data', resave: false, saveUninitialized: false }));

const store = new Store();

const authFunc = (username, password, done) => {
    // console.log(`username: ${username} - password: ${password}`);
    if (username === config.loginUser && password === config.loginPassword)
        return done(null, { name: config.loginUser });

    return done(null, false, { message: 'Incorrect username.' });
};

const passport = initPassport(app, authFunc);

const authMidFunc = config.auth == 'local'
    ? passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' })
    : passport.authenticate('basic', { session: false });

const authMiddleware = env === "development" && auth === "off"
    ? (req, res, next) => next()
    : authMidFunc;

const router = express.Router();
defineRoutes(router, store, passport, authMiddleware);

app.use('/api', router);
app.use(express.static('./public'));

app.use('/api_docs', express.static('./api_docs'));
app.use('/swagger', express.static('./node_modules/swagger-ui/dist'));

app.use((err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });
    res.status(500).send('Something went wrong');
});

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
    console.log('Server started on port %s', server.address().port);
});

const io = socketio(server);

io.on('connection', (socket) => {
    console.log('a socket connected');
});

let checkTime = moment();

async function sendNewStauses() {
    // TODO: Get only new statuses from db
    const statuses = await store.getSensorStatuses();
    const newStatuses = statuses.filter(s => moment(s.MeasurementTime).isAfter(checkTime));
    checkTime = statuses.reduce((s, e) => moment(s).isAfter(moment(e.MeasurementTime)) ? s : moment(e.MeasurementTime));

    newStatuses.forEach(s => {
        io.emit('message', `${s.SensorId} - ${s.Temperature}`);
    });
};

let devTemp = 20;

const ioFunc = env === "development"
    ? () => {
        devTemp += Math.random() * 0.02 * (Math.random() < 0.5 ? -1 : 1);
        io.emit('message', `000D6F0003141E14 - ${devTemp}`)
    }
    : sendNewStauses

setInterval(ioFunc, 15000);

export default app;