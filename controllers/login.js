var request = require('request');

function hitSeSever(req, res) {
  request.post("http://lvh.me:3000/api/v1/login", {
    form: {
      email: new Buffer(req.body.email).toString("base64"),
      password: new Buffer(req.body.pass).toString("base64")
    }
  }, function(err, response, body) {
    onSeResponse(req, res, err, response, body);
  });
}

function onSeResponse(req, res, err, response, body) {
  body = JSON.parse(body);
  if (err != null || typeof(body.error) != "undefined") {
    req.flash('error', err != null ? err : body.error);
    res.redirect('/');
  } else {
    req.session = {
      email: body.email,
      token: body.auth_token
    };
    res.redirect('/choose-import-type')
  }
};

module.exports = {
  login: hitSeSever
}