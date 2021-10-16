const handleError = (error, res, next) => {
  console.log(error.message);
  if (error.name === 'MongoServerError' && error.code === 11000) {
    if (error.keyPattern.phoneNumber) {
      next(new Error('phone number has been registered'));
    }
  } else {
    next(new Error(error.message));
  }
};

module.exports = handleError;
