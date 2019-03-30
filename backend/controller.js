var fs = require('fs');
var data = {name: 'Andy', university: 'Hong Kong University of Science and Technology', CGA: '1.4',
    email:'zyxfirst@gmail.com', username:'yzhubi'};
module.exports = function(app){
    
    app.get('/login', (req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var mypage = fs.createReadStream('../frontend/login.html', 'utf8');
        mypage.pipe(res);
    });

    app.get('/signup', (req, res) => {

    });

    app.get('/profile', (req, res) => {
        res.render('profile', data);
    })
}