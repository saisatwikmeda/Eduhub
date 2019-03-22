var express = require("express");
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('.'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
   
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
  console.log(err);
  }
  else {
  console.log('Database successfully connected');
  }
});


app.get('/login',function(req,res){
    var username = req.query.username;
    var password = req.query.password;
    console.log(username+' '+password);
    //res.send({'status':'ok'});
    con.query('SELECT password FROM students WHERE username ='+'\"'+username+'\";',
        function(err, rows, fields){
            if(err){
                console.log(err);
            } else{
                //console.log(rows.password);
                res.redirect('/HomePage');
                //res.send({"login":"ok"});
            }
        });
        //res.send({"login":"ok"});
});
app.get('/Homepage',function(req,res){
    console.log("homepage");
    res.open("../HomePage.html");
})


app.get('/signup',function(req, res){
    var username = req.query.username;
    var password = req.query.password;
    var email = req.query.email;
    var university = req.query.university;
    con.query('INSERT INTO students (Username, Password, Email, University) VALUES '
        + '(\"'+username+'\",'+ '\"'+password+'\",'+'\"'+email+'\",'+'\"'+university+'\");',
        function(err, rows, fields){
            if(err){
                console.log(err);
            } else{
                //res.redirect('hHomePage.html');
                res.send({'complete':"ok"});
            }
    });

});

app.listen(PORT, function(){
    console.log('Server listening on '+PORT);
});
