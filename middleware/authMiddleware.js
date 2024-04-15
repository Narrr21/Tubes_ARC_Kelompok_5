const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'secretKey', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/auth/login');
      } else {
        req.decodedCookies = decodedToken
        // console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/auth/login');
  }
};

module.exports = { requireAuth };