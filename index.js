const Semplice = require('./lib');

global.app = new Semplice();
app.publicRoutes('public');