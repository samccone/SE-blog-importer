var store = {};

function Post(posts) {
  var stamp = (new Date()).getTime();
  store[stamp] = {
    'key': stamp,
    'posts': posts
  }
  return store[stamp];
}

function get(key, cb) {
  if(store[key]) {
    cb(null, store[key]);
  } else {
    cb(new Error("no object found with this key"), null);
  }
}

function connect() {
  return {
    'Post': Post
  };
}



module.exports = {
  connect: connect,
  get: get
}