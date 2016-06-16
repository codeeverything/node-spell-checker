var express = require('express');
var fs = require('fs');

var app = module.exports = express();

// set location of static content
app.use(express.static('client'));

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});

var DataLoader = require('./lib/DataLoader.js')(fs, ['big.txt']);
var SpellController = require('./controller/SpellController.js')(app, DataLoader.getData());