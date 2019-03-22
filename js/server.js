var express = require("express");
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
   
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'Eduhub'});
const PORT = process.env.PORT || 8080;
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Orgin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
con.connect(function(err) {
  if (err) {
  console.log('Error connecting to database');
  }
  else {
  console.log('Database successfully connected');
  }
});

app.post('/login',function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    req = 
    con.query('SELECT password FROM students WHERE username ='+'\"'+username+'\";',
        function(err, rows, fields){
            if(err){
                console.log(err);
            } else{
                res.redirect('http://localhost:8080/HomePage.html');
            }
        });

});

app.post('/signup',function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var university = req.body.university;

    con.query('INSERT INTO students (Username, Password, Email, University) VALUES '
        + '(\"'+username+'\",'+ '\"'+password+'\",'+'\"'+email+'\",'+'\"'+university+'\");',
        function(err, rows, fields){
            if(err){
                console.log(err);
            } else{
                res.redirect('http://localhost:8080/HomePage.html');
            }
        });


});

app.listen(PORT, function(){
    console.log('Server listening on '+PORT);
});
