var request = require('request');

function downloadUpload(src, cb) {
  request.get({
    url: src,
    encoding: 'binary',
  }, function(err, res, body) {
    var isNotAnImage = res.headers["content-type"].match(/(text\/html;)/);
    if (err || isNotAnImage) {
      if (isNotAnImage) {
        cb(src + " error not a valid image " + res.headers["content-type"], null)
      } else {
        cb("error downloading image " + JSON.stringify(err, null, 4), null)
      }
    } else {
      var buf = new Buffer(body, 'binary');
      console.log("image downloaded".green)
      cb();
    }
  });
}


exports.downloadUpload = downloadUpload;