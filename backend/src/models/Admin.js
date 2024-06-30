import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const { Schema } = mongoose;
const adminSchema = new Schema({
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
  },
  password: {
    type: String,
    required: true,
  },
  feedbacks: [
    {
      username: String,
      feedback: String,
    },
  ],
  token: {
    type: String,
  },
});

adminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = jwt.sign(
    { _id: admin._id.toString() },
    process.env.SECRET_KEY,
    {
      expiresIn: "7 days",
    }
  );
  admin.token = token;
  await admin.save();
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
