var request = require('request');
var fs = require('fs');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render("login");
  });

  app.get("/choose-import-type", function(req, res) {
    res.render("typeofimport", {email: req.session.email});
  });

  app.get("/wordpress_import", function(req, res) {
    res.render("wordpress_import");
  });

  app.get("/wordpress_xml_uploaded", function(req, res) {
    res.render("wordpress_xml_uploaded", {
      filePath: req.session.xml
    });
  });

  app.post('/upload_wordpress_xml', function(req, res) {
    fs.readFile(req.files.xml.path, function(err, data) {
      var filePath = __dirname + "/../uploads/"+req.files.xml.filename;
      fs.writeFile(filePath, data, function(err) {
        if (err) {
          throw new Error("Error saving file " + err);
        } else {
          req.session.xml = filePath;
          res.redirect('/wordpress_xml_uploaded');
        }
      });
    });
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