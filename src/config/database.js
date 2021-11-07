const mongoose = require('mongoose');

exports.connect = (uri) => {
  mongoose
    .connect(uri)
    .then(() => console.log(`successfully connected on ${uri}`))
    .catch((err) => console.log(err));
};
