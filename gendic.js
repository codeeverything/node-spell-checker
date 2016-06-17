var fs = require('fs');
var dataPath = 'data/';

var files = ['big.txt'];

console.log('gen dic');
// load our data
var words;

// read the file
words = fs.readFileSync( dataPath + files[0] ).toString();

// extract all the words
// see: http://stackoverflow.com/questions/14061349/regular-expression-match-all-words-but-match-unique-words-only-once
words = words.match(/([a-zA-Z]+\b)(?!.*\1\b)/g);

var dic = [];
var wordObj = {};
for (var i=0; i < words.length; i++) {
    var word = words[i].toLowerCase();
    if (word.length < 2) {
        continue;
    }
    
    dic.push
    if (!wordObj.hasOwnProperty(word)) {
        wordObj[word] = 1;
        dic.push(word);
    } 
}

fs.writeFile(dataPath + 'dic.json', JSON.stringify(dic, null, 2) , 'utf-8');