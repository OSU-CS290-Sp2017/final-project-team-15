var path = require('path');
var fs = require('fs');
var express = require('express');
var handle = require('express-handlebars');

// var postData = require('./postData');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', handle({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next){
    var templateArgs = {
        content:
        votes:
    }
    res.render('postPage', templateArgs);
});

app.get('*', function(req, res){
    res.status(404);
    res.render('404Page');
});

app.listen(port, function(){console.log("/******* listening on port", port, "*******/")})
