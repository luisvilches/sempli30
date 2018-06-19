const Semplice = require('./lib');

global.app = new Semplice();
app.publicRoutes('public');
app.privateRoutes('auth','private');