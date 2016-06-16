
module.exports = function (fs, files) {
    
    var dataPath = 'data/';
    
    files = files || ['big.txt'];
    
    return {
        getData: function() {
            console.log('load data');
            
            // load the dic from a file - its a JSON object
            return JSON.parse(fs.readFileSync( dataPath + 'dic.json', 'utf-8' ));
        }
    };
}