var _               = require('underscore');
var cheerio         = require('cheerio');
var downloadUpload  = require('./download_upload').downloadUpload;

/**
* selects posts froms keys loops over them and processes
**/
function processPosts(keys, posts, cb) {
  var postsToProcess = _.filter(posts.posts, function(post) {
    var id = parseInt(post["wp:post_id"][0], 10);
    return Boolean(~keys.indexOf(id))
  });

  _.each(postsToProcess, function(post){
    replaceImages(unescape(post["content:encoded"]), function(errors, data) {
      if (errors.length) {
        _.each(errors, function(val) {
          console.log(val.red);
        });
      }
    });
  });
}

/**
* replaces old images with new ones
**/
function replaceImages(post, cb) {
  $           = cheerio.load(unescape(post));
  var index   = 0;
  var images  = $('img');
  var errors  = [];
  images.length && (function step() {
    uploadImage(images[index], function(err, src) {
      if (err) {
        errors.push(err);
      }
      if (++index < images.length) {
        step();
      }
      else {
        cb(errors, post)
      }
    });
  })()
}

function uploadImage(image, cb) {
  downloadUpload(image.attribs.src, function(err, data) {
    cb(err, data);
  });
}

module.exports = {
  processPosts: processPosts
}