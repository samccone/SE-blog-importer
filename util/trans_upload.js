var _               = require('underscore');
var knox            = require('knox');
var cheerio         = require('cheerio');
var http            = require('http');
var client          = knox.createClient({
  key: process.env.S3_API_KEY,
  secret: process.env.S3_SECRET,
  bucket: 'blog_importer'
});

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
  http.get(image.attribs.src, function(res) {
    if (!~res.headers['content-type'].indexOf("text/html;")) {
      var headers = {
          'Content-Length': res.headers['content-length'],
          'Content-Type': res.headers['content-type'],
          'x-amz-acl': 'public-read'
      };
      client.putStream(res, (new Date()).getTime() + "-" + Math.floor(Math.random() * 1000), headers, function(err, res){
        cb(undefined, {
          oldSrc: image.attribs.src,
          newSrc: res.client.parser.socket._httpMessage.url
        });
      });
    } else {
      console.log("not an image".red);
      cb(undefined, {
        oldSrc: image.attribs.src,
        newSrc: image.attribs.src
      });
    }
  });
}

module.exports = {
  processPosts: processPosts
}