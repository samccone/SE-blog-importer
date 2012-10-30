var xmlParser = require('../util/xml_parse');
var fs        = require('fs');
var _         = require('underscore');
var database;

function setDatabase(db) {
  database = db;
}

// parses the XML and extracts posts
function processXML(req, res) {
  fs.readFile(req.files.xml.path, function(err, data) {
    xmlParser(data, function(err, data) {
      var dataValid = !(err || !Boolean(data));
      if(!dataValid) {
        req.flash("error", "Error Reading wordpress XML");
        res.redirect('/wordpress_import');
      } else {
        parseUpload(data, req, res);
      }
    });
  });
}

function parseUpload(data, req, res) {
  saveData(getPosts(data.rss.channel[0].item), function(err, data) {
    req.session.storeKey = data.key;
    res.render('wordpress_xml_uploaded', {
      posts: data['posts']
    });
  });
}

// reads the posts and saves them to a session datastore
function saveData(blogPosts, cb) {
  var thePosts = database.Post(blogPosts);
  cb(null, thePosts);
}

// filters the posts by their post_type
function getPosts(data) {
  return (_.filter(data, function(d) {
    return d['wp:post_type'][0] == ['post']
  }));
}

module.exports = {
  setDatabase: setDatabase,
  processXML: processXML
}