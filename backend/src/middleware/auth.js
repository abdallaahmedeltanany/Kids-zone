import jwt from "jsonwebtoken";
import User from "../models/User.js";
const Auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decode._id, token: token });
    if (!user) {
      return res.status(401).send("this user is not Authorized");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    console.log("error:: ", e);
    const msg = e.expiredAt ? "Your session is expired" : "Please authenticate";
    res.status(500).send({ msg });
  }
};

export default Auth;
