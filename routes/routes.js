// import other routes
const userRoutes = require('./pokemon');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the pokemon development api-server');
    });

    // // other routes
    userRoutes(app, fs);

};

module.exports = appRouter;