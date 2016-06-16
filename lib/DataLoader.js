
module.exports = function (fs, files) {
    
    var dataPath = 'data/';
    
    files = files || ['big.txt'];
    
    return {
        getData: function() {
            console.log('load data');
            // load our data
            var words;
            
            // read the file
            words = fs.readFileSync( dataPath + files[0] ).toString();
            
            // extract all the words
            // see: http://stackoverflow.com/questions/14061349/regular-expression-match-all-words-but-match-unique-words-only-once
            words = words.match(/(\w+\b)(?!.*\1\b)/g);
            
            var wordObj = {};
            for (var i=0; i < words.length; i++) {
                if (!wordObj.hasOwnProperty(words[i])) {
                    wordObj[words[i]] = 1;
                } else {
                    wordObj[words[i]]++;
                }
            }
            
            return wordObj;
        }
    };
}