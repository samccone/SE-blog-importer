var loginController = require('../controllers/login');
var wordpressController = require('../controllers/wordpress');

module.exports = function(app, db) {
  wordpressController.setDatabase(db);

  app.get('/', function(req, res) {
    res.render("login", {errors: req.flash("error")});
  });

  app.get("/choose-import-type", function(req, res) {
    res.render("typeofimport", {email: req.session.email});
  });

  app.get("/wordpress_import", function(req, res) {
    res.render("wordpress_import", {errors: req.flash("error")});
  });

  app.get("/wordpress_xml_uploaded", function(req, res) {
    res.render("wordpress_xml_uploaded", {
      filePath: req.session.xml
    });
  });

  app.post('/login', loginController.login);
  app.post('/upload_wordpress_xml', wordpressController.processXML);
}