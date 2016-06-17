module.exports = function (app, tree) {
    // monitor routes
    app.get('/api/check/:word', function (req, res) {
      console.time('lookup');
      var ans = tree.search(req.params.word, 3);
      console.timeEnd('lookup');
      res.send(ans);
    });
}