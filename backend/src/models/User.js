import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    validate(value) {
      if (value.length < 7) {
        throw new Error(
          "Password must be at least 7 characters & numbers long"
        );
      }
    },
  },
  token: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);
  user.token = token;
  await user.save();
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
