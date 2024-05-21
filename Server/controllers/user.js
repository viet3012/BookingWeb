const User = require("../models/User");

// Đăng nhập
exports.login = async (req, res, next) => {
  const data = req.body;
  const foundUser = await User.findOne({
    $and: [{ email: data.email }, { password: data.password }],
  });

  if (foundUser === null) {
    return res.status(200).json({ message: "wrong" });
  } else {
    res.send(foundUser);
  }
};

// Đăng ký
exports.signup = async (req, res, next) => {
  const data = req.body;

  const newUser = new User({
    username: "",
    password: data.password,
    fullName: "",
    phoneNumber: "",
    email: data.email,
    isAdmin: false,
    identity: "",
  });

  const foundUser = await User.findOne({ email: data.email });
  if (foundUser === null) {
    newUser.save();
    res.end();
  } else {
    return res.status(200).json({ message: "user exist" });
  }
};

// Tìm người dùng theo email
exports.findUserByEmail = async (req, res, next) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: email });
    res.send(user);
  } catch (err) {
    console.log("Error:", err);
  }
};
