var express = require('express')
var fs = require('fs')
var Mustache = require('mustache')
var request = require('request')


var app = express();

app.get("/madlibstyle.css", function(req, res) {
    fs.readFile("madlibstyle.css", 'utf8', function(err, data) {
        res.send(data);

    }); //end readFile

}); //end css get thingy

app.get("/", function(req, res) {
    fs.readFile('./index.html', 'utf8', function(err, data) {
        console.log("SOMEONE'S HERE OMG")
        request.get("http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=7&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5", function(error, response, body) {
            var randomWords = JSON.parse(body)
            var rendered = Mustache.render(data,{"words": randomWords})
            res.send(rendered)

        });

    }); //end async readFile function
}); //end app.get root function

app.get("/story", function(req, res) {
    console.log("Accessed /story")
        //console.log(req.query)
        //var renderObject = { "noun1": req.query.noun1}


    var storySelected = "./stories/" + req.query.story_selected + ".html"
    fs.readFile(storySelected, 'utf8', function(err, data) {
        //var renderObject = JSON.parse(req.query);
        var userStory = Mustache.render(data, req.query);
        res.send(userStory)
    }); //end read selected story template file function
}); //end app.get /story function



app.listen(3001, function() {
    console.log("I'm a-listening.")
});