
module.exports = function (fs) {
    
    var dataPath = 'data/';
    
    return {
        getData: function() {
            // load our data
            var adjectives;
              
            adjectives = fs.readFileSync( dataPath + 'words.txt' ).toString().split("\n");
            
            var animals;
              
            animals = fs.readFileSync( dataPath + 'animals.txt' ).toString().split("\n");
            
            return {
                adjectives: adjectives,
                animals: animals
            };
        }
    };
}