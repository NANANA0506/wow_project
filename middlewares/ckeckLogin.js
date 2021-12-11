const checkLogin = (req, res, next) => {
  req.session.isLoggedIn = false;

  next();
};

module.exports = checkLogin;
