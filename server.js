var express = require('express');
var fs = require('fs');
var util = require('util');
var BKTree = require('./lib/BKTree.js')(util);

var app = module.exports = express();

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});

// get dictionary data
var DataLoader = require('./lib/DataLoader.js')(fs);
var data = DataLoader.getData();

// Build the tree 
var term = data.pop();
var tree = new BKTree(term);
while (term = data.pop()) {
    tree.add(term);
}

// handle spell check requests
var SpellController = require('./controller/SpellController.js')(app, tree);