
// https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
let wrap = fn => (...args) => fn(...args).catch(args[2])

export default (router, store, passport, auth) => {

    router.get('/', (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!');
    });

    router.get('/login', (req, res) => {
        res.send('this is login page');
    });

    router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }));

    router.get('/data', auth, wrap(async (req, res) => {
        const data = await store.get();
        res.send(data);
    }));

    router.get('/:sensor_id', auth, wrap(async (req, res) => {
        const id = req.params.sensor_id;
        const data = await store.get(id, 1);
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