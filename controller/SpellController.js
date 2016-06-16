module.exports = function (app, data) {
    // monitor routes
    app.get('/api/check/:word', function (req, res) {
      var words = ['one', 'two', 'three'];
      
      var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

      var unique = function(xs) {
        return xs.filter(function(x, i) {
          return xs.indexOf(x) === i
        })
      };
      
      function edits1(word) {
        console.time('edits1()');
        var result = [];
        
        // deletions
        for(var i=0; i <= word.length - 1; i++) {
          result.push(word.substring(0, i) + word.substring(i+1));
        }
        
        // transpositions
		    for(var i=0; i <= word.length - 1; i++) {
          result.push(word.substring(0, i) + word.substring(i+1, i+2) + word.substring(i, i+1) + word.substring(i+2));
        }
        
		    // replacements
        for(var i=0; i <= word.length; i++) {
          for(var c = 0; c < alphabet.length; c++) {
            result.push(word.substring(0, i) + alphabet[c] + word.substring(i+1));
          }
        }
        
        // insertions
        for(var i=0; i <= word.length; i++) {
          for(var c = 0; c < alphabet.length; c++) {
            result.push(word.substring(0, i) + alphabet[c] + word.substring(i));
          }
        }
        
        result = unique(result);
        console.time('edits1()');
    
        return result;
      }
      
      function known_edits2(edits) {
          console.time('known_edits2()');
          var results = [];
          for (var edit in edits) {
            var f = edits1(edits[edit]);
            results = results.concat(f);
          }
          
          console.log(results.length);
          console.timeEnd('known_edits2()');
          return known(results);
      }
      
      // return the word if it is in the dictionary, otherwise nothing
      function known(words) { 
        console.time('known()');
        console.log(words.length);
        var a = [];
        for(var w in words) {
          if (data.hasOwnProperty(words[w])) {
            a.push({
              word: words[w],
              score: data[words[w]]
            });
          }
        }
        
        console.timeEnd('known()');
        return a;
      }
      
      function correct(word) {
          console.time('correct()');
          var oneEdit = edits1(word);
          var res = known([word]).concat(known(oneEdit).concat(known_edits2(oneEdit)));
          res.sort(function(a, b) {
              return parseInt(b.score) - parseInt(a.score);
          });
          console.timeEnd('correct()');
          
          return res;
      }
      
      res.send(correct(req.params.word));
    });
}