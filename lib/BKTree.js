

module.exports = function (util) {
    
    var dataPath = 'data/';
    
    var levenshtein = (function () {
      var row2 = [];
      return function (s1, s2) {
        if (s1 === s2) {
          return 0;
        } else {
          var s1_len = s1.length,
            s2_len = s2.length;
          if (s1_len && s2_len) {
            var i1 = 0,
              i2 = 0,
              a, b, c, c2, row = row2;
            while (i1 < s1_len)
              row[i1] = ++i1;
            while (i2 < s2_len) {
              c2 = s2.charCodeAt(i2);
              a = i2;
              ++i2;
              b = i2;
              for (i1 = 0; i1 < s1_len; ++i1) {
                c = a + (s1.charCodeAt(i1) === c2 ? 0 : 1);
                a = row[i1];
                b = b < a ? (b < c ? b + 1 : c) : (a < c ? a + 1 : c);
                row[i1] = b;
              }
            }
            return b;
          } else {
            return s1_len + s2_len;
          }
        }
      };
    })();
    
    function BKTree(term, dist) {
        this.term = term;
        this.dist = dist || 0;
        this.children = {};
        
        this.add = function (term) {
            var dist = levenshtein(this.term, term);
            
            if (!this.children[dist]) {
                this.children[dist] = new BKTree(term, dist);
                return;
            }
            
            if (this.children[dist].dist == dist) {
                this.children[dist].add(term);
            }
        }
        
        this.search = function (query, editDistance) {
            var matches = this.doSearch(query, editDistance);
            
            matches.sort(function (a, b) {
              return a.dist - b.dist; 
            });
            
            return matches;
        }
        
        this.doSearch = function (query, editDistance, matches) {
            matches = matches || [];
            var dist = levenshtein(this.term, query);
            
            if (dist <= editDistance) {
                matches.push({
                    term: this.term,
                    dist: dist
                });
            }
            
            var minEdge = dist - editDistance;
            var maxEdge = dist + editDistance;
            
            for (var i=minEdge; i <= maxEdge; i++) {
                if (this.children[i]) {
                    matches = matches.concat(this.children[i].search(query, editDistance, matches));
                }
            }
            
            return matches;
        }
    }
    
    return BKTree;
    
    // var tree = new BKTree('book');
    // tree.add('books');
    // tree.add('cake');
    // tree.add('boo');
    // tree.add('cape');
    // tree.add('boon');
    // tree.add('cook');
    // tree.add('cart');
    // console.log(util.inspect(tree, false, null));
    // console.log(tree.search('caqe', 1));
}

