
// https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
let wrap = fn => (...args) => fn(...args).catch(args[2]);

export default (router, store, passport, auth) => {

    router.get('/', (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!');
    });

    router.get('/login', (req, res) => {
        res.send('this is login page');
    });

    router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }));

    router.get('/sensors', auth, wrap(async (req, res) => {
        const data = await store.getSensorIds();
        res.send(data);
    }));

    router.get('/status', auth, wrap(async (req, res) => {
        const data = await store.getSensorStatuses();
        res.send(data);
    }));
    
    router.get('/data', auth, wrap(async (req, res) => {
        const skip = req.query.skip || 0;
        const take = req.query.take || 1;
        const data = await store.getAllData(take, skip);
        res.send(data);
    }));

    router.get('/data/:sensor_id', auth, wrap(async (req, res) => {
        const id = req.params.sensor_id;
        const skip = req.query.skip || 0;
        const take = req.query.take || 1;
        const data = await store.getSensorData(id, take, skip);
        res.send(data);
    }));

    router.get('/avg/:field_id/:sensor_id', auth, wrap(async (req, res) => {
        const sensorId = req.params.sensor_id;
        const field = req.params.field_id;
        const minutes = req.query.minutes || 60;

        const data = await store.getAvg(sensorId, field, minutes);
        res.send(data);
    })); 
};