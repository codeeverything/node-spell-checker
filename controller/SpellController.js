module.exports = function (app, tree) {
    // monitor routes
    app.get('/api/check/:word', function (req, res) {
      var ans = tree.search(req.params.word, 3);
      res.send(ans);
    });
}