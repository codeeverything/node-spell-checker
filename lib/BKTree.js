/**
 * BK Tree implementation
 * 
 * Generate and search a BK Tree for matches within some edit distance tolerance of the query
 *  
 * References: 
 * https://en.wikipedia.org/wiki/BK-tree
 * https://en.wikipedia.org/wiki/Levenshtein_distance
 * https://nullwords.wordpress.com/2013/03/13/the-bk-tree-a-data-structure-for-spell-checking/
 * https://www.npmjs.com/package/bktree
 * 
 * @author  Mike Timms <mike@codeeverything.com>
 */

module.exports = function (util) {
    
    // Levenstein Distance - taken from https://www.npmjs.com/package/bktree
    // Other implementations to check: https://github.com/hiddentao/fast-levenshtein
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
    
    /**
     * Generate a new BK Tree with term as its root
     * Set the edit distance as dist, if supplied
     * 
     * @param string term - The term to set as the "root" of the tree
     * @param int dist - The edit distance to set
     * @return void
     */
    function BKTree(term, dist) {
        /**
         * @var string - Term to add
         */
        this.term = term;
        
        /**
         * @var int - The edit distance of this term
         */
        this.dist = dist || 0;
        
        /**
         * @var object - A list of child BK Trees
         */
        this.children = {};
        
        /**
         * Add the given term to the tree
         * 
         * @param string term - The term to add
         * @return void
         */
        this.add = function (term) {
            var dist = levenshtein(this.term, term);
            
            // if a child doesn't exist with this edit distance then add it here
            if (!this.children[dist]) {
                this.children[dist] = new BKTree(term, dist);
                return;
            }
            
            // we can only have one child at a given edit distance, for each "level" of the tree
            // if we have a child for dist already, then pass the term on to it
            // and have it try to add. This will contiue until we find a node which 
            // doesn't have a child with edit distance "dist"
            if (this.children[dist].dist == dist) {
                this.children[dist].add(term);
            }
        }
        
        /**
         * Search the tree for leaves with an edit distance of <= editDistance
         * from the query
         * 
         * @param string query - The query term
         * @param int editDistance - The max edit distance from the query to accept matches for
         */
        this.search = function (query, editDistance) {
            var matches = this.doSearch(query, editDistance);
            
            matches.sort(function (a, b) {
              return a.dist - b.dist; 
            });
        
            return matches.slice(0, 9).map(function (item) {
                return item.term;
            });
        }
        
        /**
         * Helper function to this.search, actually does the heavy lifting
         * 
         * @param string query - The query term
         * @param int editDistance - The max edit distance from the query to accept matches for
         * @param array matches - An array to hold any matches we find
         */
        this.doSearch = function (query, editDistance, matches) {
            matches = matches || [];
            var dist = levenshtein(this.term, query);
            
            // if the term and the query are within editDistance edits, then add as a result
            if (dist <= editDistance) {
                matches.push({
                    term: this.term,
                    dist: dist
                });
            }
            
            // decide which children to search
            // these should be from (dist - editDistance) to (dist + editDistance)
            var minEdge = dist - editDistance;
            var maxEdge = dist + editDistance;
            
            // search any child trees if applicable
            for (var i=minEdge; i <= maxEdge; i++) {
                if (typeof this.children[i] !== 'undefined') {
                    var tmp = this.children[i].doSearch(query, editDistance, []);
                    if (tmp.length > 0) {
                        matches = matches.concat(tmp);
                    }
                }
            }
            
            return matches;
        }
    }
    
    return BKTree;
    
    // test data
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

