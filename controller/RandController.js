module.exports = function (app, DataLoader) {
    // monitor routes
    app.get('/rand', function (req, res) {
      var data = DataLoader.getData();
      var words = [];
      var len = 3;
      
      var styles = ['word-lightest', 'word-lighter', 'word-lightest'];
      var wordList = data.adjectives;
      var str = '';
      
      for (var i=0; i<len; i++) {
        if (i === len - 1) {
          wordList = data.animals;
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
}