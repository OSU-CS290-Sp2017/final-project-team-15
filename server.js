var path = require('path');
var fs = require('fs');
var express = require('express');
var handle = require('express-handlebars');
var bodyParser = require('body-parser');

var postData = require('./postData');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', handle({defaultLayout: 'main'})); //use handlebars
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public'))); //pull things out of the public folder
app.use(bodyParser.json()); //use bodyParser for post requests with JSON

//send stuff for homepage
app.get('/', function(req, res, next){
    //object to send to template
    //postData has fields "content" and "votes"
    var templateArgs = {
        posts: postData,
    };
    res.render('postPage', templateArgs); //make the page for the user
});

//if we see the user is trying to post stuff
app.post('/post', function(req, res, next){
    //log what the user is adding
    console.log("-------- got a post request with", req.body.content, req.body.votes);
    if(req.body && req.body.content){
        //make an object to receive stuff from client
        var post = {
            content: req.body.content,
            votes: req.body.votes
        };
        postData.push(post); //ADDS IT TO THE END OF THE JSON FILE CHANGE THIS TO DATABASE
        //send information back to client
        fs.writeFile('postData.json', JSON.stringify(postData), function(err){
            if(err){
                res.status(500).send("Unable to make post");
            }else{
                res.status(200).send();
            }
        });
    }else{
        res.status(400).send("Must have content in post");
    }
});

//if we see the user is trying to post stuff
app.post('/vote', function(req, res, next){
    //log what the user is adding
    console.log("-------- got a vote change request with", req.body.bool, req.body.index);
    if(req.body){
        //make an object to receive stuff from client
        var index = req.body.index;

        var vote = Number.parseInt(postData[index].votes);
        if(req.body.bool){
            vote++;
        }else{
            vote--;
        }
        postData[index].votes = JSON.stringify(vote);
        //send information back to client
        fs.writeFile('postData.json', JSON.stringify(postData), function(err){
            if(err){
                res.status(500).send("Unable to accomplish vote.");
            }else{
                res.status(200).send();
            }
        });
    }else{
        res.status(400).send("Must have clicked valid button.");
    }
});

//for all pages not specified, give them the 404 page
app.get('*', function(req, res){
    res.status(404);
    // res.render('404Page');
});

app.listen(port, function(){console.log("/******* listening on port", port, "*******/")})
