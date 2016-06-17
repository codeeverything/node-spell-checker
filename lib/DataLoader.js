
module.exports = function (fs) {
    
    var dataPath = 'data/';
    
    return {
        getData: function() {
            // load the dic from a file - its a JSON object
            return JSON.parse(fs.readFileSync( dataPath + 'dic.json', 'utf-8' ));
        }
    };
}