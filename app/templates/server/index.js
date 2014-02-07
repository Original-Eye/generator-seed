var express = require('express'),
	path = require('path'),
	http = require('http'),
	routes = require('./routes'),
	api = require('./routes/api'),
	app = module.exports = express(),
	port = process.env.PORT || 3000,
	engines = require('consolidate');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + './../client/views');
app.engine('html', engines.underscore);
app.set('view engine', 'html');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
// app.use(express.static(path.join(__dirname, '../client')));
app.use(app.router);

app.get ('/', routes.index);
app.get ('/api/name', api.name);

app.listen(port);
console.log('running...');
console.log("Express server listening on port %d in %s mode", port, app.settings.env);