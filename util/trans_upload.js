var _       = require('underscore');
var cheerio = require('cheerio');

function processPosts(keys, posts, cb) {
  _.each(_.find(posts.posts, function(post) {
    var id = parseInt(post["wp:post_id"][0], 10);
    return Boolean(~keys.indexOf(id))
  }), function(data) {
    // WIPPPP
    // replaceImages(data, function() {
    //   console.log("ok!");
    // });
  });;
}

function replaceImages(post, cb) {
  $           = cheerio.load(unescape(post));
  var index   = -1;
  var images  = $('img');
  (function step() {
    uploadImage(images[++index], function(err, src) {
      if (err)
        cb(err, null);
      else if (index < images.length - 1)
        step();
      else
        cb(null, post)
    });
  }())
}

function uploadImage(image, cb) {
}

module.exports = {
  processPosts: processPosts
}