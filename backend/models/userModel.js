const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// signup static function
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All Fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please enter valid Email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  //   save to db
  const user = await this.create({ email, password: hash });

  return user;
};

// login statid function
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All Fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("User not exists");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Password incorrect");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
