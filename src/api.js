
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
    
     router.get('/temperature', auth, wrap(async (req, res) => {      
        const data = await store.get();
        res.send(data);
    }));  
};