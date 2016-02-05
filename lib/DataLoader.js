
module.exports = function (fs, files) {
    
    var dataPath = 'data/';
    
    files = files || ['adjectives.txt', 'animals.txt'];
    
    return {
        getData: function() {
            // load our data
            var adjectives;
              
            adjectives = fs.readFileSync( dataPath + files[0] ).toString().split("\n");
            
            var animals;
              
            animals = fs.readFileSync( dataPath + files[1] ).toString().split("\n");
            
            return {
                adjectives: adjectives,
                animals: animals
            };
        }
    };
}