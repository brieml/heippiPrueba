const { sign, verify } = require("jsonwebtoken");

const signToken = function (payload) {
  return sign(payload, "Heippi Prueba", {
    expiresIn: "1h",
  });
};

const auth = (req, res, next) => {
  let token = req.headers.authorization || "";

  if (token.startsWith("Bearer ")) {
    token = token.substring(7);
  }

  if (token) {
    verify(token, "Heippi Prueba", function (err, decoded) {
      if (!err) {
        req.decoded = decoded;
        next();
      } else {
        next({
          statusCode: 401,
          message: "Unauthorized",
        });
      }
    });
  } else {
    next({ message: "Unauthorized", statusCode: 401 });
  }
};

module.exports = { signToken, auth };
