var express = require('express');
var fs = require('fs');
var util = require('util');
var BKTree = require('./lib/BKTree.js')(util);

var app = module.exports = express();

// set location of static content
app.use(express.static('client'));

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});

var DataLoader = require('./lib/DataLoader.js')(fs);

// Build the tree 
console.log('build tree');
var data = DataLoader.getData();
var term = data.pop();
var tree = new BKTree(term);
while (term = data.pop()) {
    tree.add(term);
}
// var tree = new BKTree('book');
// tree.add('books');
// tree.add('cake');
// tree.add('boo');
// tree.add('cape');
// tree.add('boon');
// tree.add('cook');
// tree.add('cart');
// console.log('tree built');
// console.log(util.inspect(tree, false, null));
// console.log(tree.search('caqe', 2));

var SpellController = require('./controller/SpellController.js')(app, tree);