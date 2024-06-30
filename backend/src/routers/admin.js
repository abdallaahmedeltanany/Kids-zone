import express from "express";
import Admin from "../models/Admin.js";
import adminAuth from "../middleware/adminAuth.js";
import validator from "validator";
const router = express.Router();

// signin
router.post("/admin/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(404).send({ msg: "Please fill all the fields" });
  try {
    if (!validator.isEmail(email)) {
      res.status(400).send({ msg: "Please enter a valid email format!!" });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).send({ msg: "This email is not existing !!" });
    }
    if (admin.password !== password) {
      return res.status(400).send({ msg: "The password is not correct!!" });
    }
    const token = await admin.generateAuthToken();
    // res.setHeader("Authorization", `Bearer ${token}`);
    res
      .status(200)
      .send({ msg: "Signed in Successfull", token: `Bearer ${token}` });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: `error just occured : ${e}` });
  }
});

//signout
router.post("/admin/signout", adminAuth, async (req, res) => {
  try {
    req.admin.token = "";
    await req.admin.save();
    res.status(200).send({ msg: "signed out successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: `error just occured : ${e}` });
  }
});

// review feedbacks
router.get("/admin/feedbacks", adminAuth, async (req, res) => {
  try {
    const feedbacks = req.admin.feedbacks;
    res.status(200).send({ feedbackArray: feedbacks });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: `error just occured : ${e}` });
  }
});

export default router;
