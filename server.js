var express = require('express');
var fs = require('fs');
var path = require("path");

var app = express();
app.use(express.static('client'));

app.get('/rand/:len?', function (req, res) {
  var words = [];
  var len = req.params.len;
  if (!len) {
    len = 3;
  }
  
  if (len > 5) {
    len = 5
  }
  
  var wordList = adjectives;
  var str = '';
  
  for (var i=0; i<len; i++) {
    if (i === len - 1) {
      wordList = animals;
    }
    
    var rand = (Math.random() * (wordList.length - 1)).toFixed(0);
    
    str = wordList[rand].charAt(0).toUpperCase();
    str += wordList[rand].slice(1);
    
    words.push(str)  
  }
  
  res.send(words.join(''));
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});

// load our data
var adjectives;
  
fs.readFile( 'adjectives.txt', function (err, data) {
  if (err) {
    throw err; 
  }
  
  // console.log(data.toString());
  adjectives = data.toString().split("\n");
});

var animals;
  
fs.readFile( 'animals.txt', function (err, data) {
  if (err) {
    throw err; 
  }
  
  // console.log(data.toString());
  animals = data.toString().split("\n");
});