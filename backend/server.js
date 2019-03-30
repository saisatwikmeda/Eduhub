var express = require('express');
var path = require('path');
var app = express();
var controller = require(__dirname+'/controller');
app.use(express.static('../frontend'));
app.set('view engine', 'ejs');
app.set('views', path.join('../frontend/templates/profile'));
controller(app);

app.listen(8080);
