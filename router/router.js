var request = require('request');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render("login");
  });

  app.get("/choose-import-type", function(req, res) {
    res.render("typeofimport", {email: req.session.email});
  });

  app.post('/login', function(req, res) {
    request.post("http://lvh.me:3000/api/v1/login", {
      form: {
        email: new Buffer(req.body.email).toString("base64"),
        pass: new Buffer(req.body.pass).toString("base64")
      }
    }, function(d) {
      req.session = {email: req.body.email};
      res.redirect('/choose-import-type')
    })
  });
}