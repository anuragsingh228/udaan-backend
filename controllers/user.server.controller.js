const bcrypt = require("bcryptjs");
const User = require("../model/users");
const jwt = require("jsonwebtoken");

const authKey="loremipsom";


exports.justChecking = (req, res, next) => {
    res.status(200).json({
        message: "Articles fetched succesfuly!"
      });
}


exports.signIn = async(req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "User does not exists" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Password does not match" }] });
      }
      const authToken = jwt.sign(
        {
          _id: user._id,
        },
        authKey,
        {
          expiresIn: "48h",
        }
      );
      return res.status(200).json({
        authToken,
      });
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
}


// awin@gmail.com , password: 12345
// anurags6555@gmail.com, 987456
exports.signUp=  async(req, res) => {
    const {username,  name, email, password, interests } = req.body;
    console.log(req.body);
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      const newuser = User({
        name,
        email,
        password,
        username,
        interests
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newuser.password, salt, (err, hash) => {
          if (err) throw err;
          newuser.password = hash;
          newuser.save((err, user) => {
            res.status(200).json(user);
          });
        });
      });
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  
}

exports.getUserByID = (req, res, next) => {
  
}