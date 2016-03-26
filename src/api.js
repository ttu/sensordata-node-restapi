
// https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
let wrap = fn => (...args) => fn(...args).catch(args[2])

export default (app, store, passport, auth) => {

    app.get('/', (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!');
    });

    app.get('/login', (req, res) => {
        res.send('this is login page');
    });

    app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
        console.log('loginin');
        res.redirect('/');
    });

    app.get('/data', auth, wrap(async (req, res) => {      
        const data = await store.get();
        res.send(data);
    })); 
};