var xmlParser = require('../util/xml_parse');
var fs = require('fs');
var _ = require('underscore');

function parseXML(req, res) {
  fs.readFile(req.files.xml.path, function(err, data) {
    xmlParser(data, function(err, data) {
      if(err) {
        req.flash("error", err);
        res.redirect('/upload_wordpress_xml');
      } else {
        console.log(data.rss.channel);
        req.session.xml_data = "ok";
        res.redirect('/wordpress_xml_uploaded');
      }
    });
  });
}

module.exports = {
  parseXML: parseXML
}