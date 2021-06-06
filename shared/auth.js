const jwt = require("jsonwebtoken");
const User = require("../model/users");
const authKey="loremipsom"
/*<=====================================Student====================================================>*/

exports.isUserAuth = (req, res, next) => {
  const token = req.header("Bearer");
  console.log(token);
  if (token) {
    jwt.verify(token, authKey, (err, payload) => {
      if (err) {
        return res.status(401).send({ message: "Invalid Token" });
      }
      const { _id } = payload;
      User.findById(_id)
        .select("-password")
        .then((userdata) => {
          req.user = userdata;
          console.log(req.user);
          next();
        });
    });
  } else {
    return res.status(401).send({ message: "User not signed in." });
  }
};