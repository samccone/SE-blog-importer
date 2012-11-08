var fs = require('fs');
var color = require('colors');

// APP CODE
var wordpressController = require('../controllers/wordpress');
var db = require('../db/database').connect();
var transUpload = require('../util/trans_upload');

wordpressController.setDatabase(db);


wordpressController.processXML({files: {xml : {path: __dirname + "/data/sample.xml"}}}, {}, function(data) {
  console.log("XML PROCESSED AND SAVED!".green);
  transUpload.processPosts([847, 468], data);
});