const checkLogin = (req, res, next) => {
  req.session.isLoggedIn = true;

  next();
};

module.exports = checkLogin;
