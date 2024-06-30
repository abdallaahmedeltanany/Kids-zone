import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const admin = await Admin.findOne({
      _id: decode._id,
      token: token,
    });
    if (!admin) {
      return res.status(401).send({ msg: "the amdin in not authorized now!!" });
    }
    req.admin = admin;
    req.token = token;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: e });
  }
};

export default adminAuth;
