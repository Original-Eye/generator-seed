var express = require('express'),
    app = express(),
    path = require('path');

app.use(express.logger());
app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res){
    res.send('Hello World');
});
var port = process.env.PORT || 3000 ;
app.listen(port);
console.log('running...');
console.log("Express server listening on port %d in %s mode", port, app.settings.env);