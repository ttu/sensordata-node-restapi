export default (app, store, passport, auth) => {

    app.get('/', function(req, res) {
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

    app.get('/data', auth, async (req, res) => {
        const data = await store.get();
        res.send(data);
    });
    
};