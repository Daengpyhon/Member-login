const bcrypt = require("bcryptjs");
const MyUser = require("../models/User");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

//! #############  Register ##############

exports.listUsers = async (req, res) => {
  try {
    const user = await MyUser.find({}).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!");
  }
};

exports.readUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await MyUser.findOne({ _id: id }).exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!");
  }
};

///! Update
exports.updateUsers = async (req, res) => {
  try {
    //console.log(req.body.value.password)
    var { id, password } = req.body.value;

    // 1 Gen salt
    const salt = await bcrypt.genSalt(10);
    // 2 Encript
    var enPassword = await bcrypt.hash(password, salt);

    //console.log('En Pass : ', enPassword)

    const user = await MyUser.findOneAndUpdate(
      { _id:id },
      { password: enPassword }
    );
    res.send(user);

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!");
  }
};
//! Remove
exports.removeUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await MyUser.findOneAndDelete({ _id: id }).exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(user);
  }
};
// ! Change status
exports.changeStatus = async (req, res) => {
  try {
    //  console.log(req.body)

    const user = await MyUser.findOneAndUpdate(
      { _id: req.body.id },
      { enabled: req.body.enabled }
    );

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

///! Change Role
exports.changeRole = async (req, res) => {
  try {
    //console.log(req.body)

    const user = await MyUser.findOneAndUpdate(
      { _id: req.body.id },
      { role: req.body.role }
    );

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};
