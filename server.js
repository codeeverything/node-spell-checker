var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();
// set location of static content
app.use(express.static('client'));

// monitor routes
app.get('/rand', function (req, res) {
  var words = [];
  var len = 3;
  
  var styles = ['word-lightest', 'word-lighter', 'word-lightest'];
  var wordList = adjectives;
  var str = '';
  
  for (var i=0; i<len; i++) {
    if (i === len - 1) {
      wordList = animals;
    }
    
    var rand = (Math.random() * (wordList.length - 1)).toFixed(0);
    
    str = wordList[rand].charAt(0).toUpperCase();
    str += wordList[rand].slice(1);
    
    words.push({
      word: str,
      style: styles[i]
    });
  }
  
  res.send(words);
});

// setup server
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});

// load our data
var adjectives;
  
fs.readFile( 'adjectives.txt', function (err, data) {
  if (err) {
    throw err; 
  }
  
  adjectives = data.toString().split("\n");
});

var animals;
  
fs.readFile( 'animals.txt', function (err, data) {
  if (err) {
    throw err; 
  }
  
  animals = data.toString().split("\n");
});