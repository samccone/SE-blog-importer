var request = require('request');

function hitSeSever(req, res) {
  request.post("http://samexhibit.com/api/v1/login", {
    form: {
      email: new Buffer(req.body.email).toString("base64"),
      password: new Buffer(req.body.pass).toString("base64")
    }
  }, function(err, response, body) {
    onSeResponse(req, res, err, response, body);
  });
}

function onSeResponse(req, res, err, response, body) {
  if (!body || (err != null || typeof(body.error) != "undefined")) {
    req.flash('error', err != null ? err : body.error);
    res.redirect('/');
  } else {
    body = JSON.parse(body);
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