import express from "express";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Auth from "../middleware/auth.js";
import validator from "validator";
import Gtts from "gtts";
import axios from "axios";
import {
  originalStoriesMale,
  originalStoriesFemale,
  original_stories_male,
  original_stories_female,
} from "../helpers/stories_array.js";

const router = express.Router();

// sign up
router.post("/user/signup", async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password)
    return res.status(404).send({
      msg: "Please fill all the fields",
    });

  try {
    if (!validator.isEmail(email)) {
      res.status(400).send({ msg: "Please enter a valid email format!!" });
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).send({ msg: "This email is already exist!!" });
    }
    const checkUsername = await User.findOne({ username });
    if (checkUsername) {
      return res.status(400).send({ msg: "This username is already exist!!" });
    }
    if (password.length < 7) {
      return res
        .status(401)
        .send({ msg: "Password must be at least 7 characters long" });
    }
    const user = new User(req.body);
    await user.save();

    const token = await user.generateAuthToken();

    // res.setHeader("Authorization", `Bearer ${token}`);
    res
      .status(200)
      .send({ msg: "Signed up Successfully", token: `Bearer ${token}` });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: `error just occured : ${e}` });
  }
});

// signin
router.post("/user/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(404).send({ msg: "Please fill all the fields" });

  try {
    if (!validator.isEmail(email)) {
      res.status(400).send({ msg: "Please enter a valid email format!!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "This email is not existing !!" });
    }
    if (user.password !== password) {
      return res.status(400).send({ msg: "The password is not correct!!" });
    }
    const token = await user.generateAuthToken();
    // res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).send({
      msg: "Signed in Successfully",
      token: `Bearer ${token}`,
      userData: { username: user.username, email: user.email },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: `error just occured : ${e}` });
  }
});

//signout
router.post("/user/signout", Auth, async (req, res) => {
  try {
    req.user.token = "";
    await req.user.save();
    res.status(200).send({ msg: "signed out successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: `error just occured : ${e}` });
  }
});

// send feedback
router.post("/user/feedback", Auth, async (req, res) => {
  const feedback = req.body.feedback;
  if (!feedback) {
    return res.status(404).send({ msg: "Please fill the feedback field" });
  }

  try {
    const username = req.user.username;
    const receivedFeedback = { username, feedback };

    const admin = await Admin.findOne({ email: "admin@gmail.com" });
    admin.feedbacks.push(receivedFeedback);

    await admin.save();
    res.status(200).send({ msg: "Feedback sent successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: `error just occured : ${e}` });
  }
});

router.post("/generate-stories-english", Auth, async (req, res) => {
  const { gender, inputs } = req.body;

  try {
    let originalStories =
      gender === "M" ? originalStoriesMale : originalStoriesFemale;

    const modifiedStories = originalStories.map((story, i) => {
      const name = inputs.name;
      const sport = inputs.sport;
      const hobby = inputs.hobby;
      const color = inputs.color;

      const title = story.title
        .replace(/{name}/g, name)
        .replace(/{color}/g, color)
        .replace(/{hobby}/g, hobby)
        .replace(/{sport}/g, sport);
      const description = story.description
        .replace(/{name}/g, name)
        .replace(/{color}/g, color)
        .replace(/{hobby}/g, hobby)
        .replace(/{sport}/g, sport);

      return {
        title,
        description,
        filename: `story${i + 1}.mp3`,
      };
    });

    // Generate audio files
    const audios = await Promise.all(
      modifiedStories.map((story) => {
        const title = story.title;
        const description = story.description;
        const storyText = `${title}. ${description}`;
        const gtts = new Gtts(storyText, "en");
        return new Promise((resolve, reject) => {
          // store gtts result in an object not a file
          let capturedOutput = Buffer.from("");
          gtts
            .stream()
            .on("data", function (chunk) {
              capturedOutput = Buffer.concat([capturedOutput, chunk]);
            })
            .on("end", function () {
              const base64Output = capturedOutput.toString("base64");
              resolve(base64Output);
            });
        });
      })
    );

    const stories = modifiedStories.map((s, i) => {
      return {
        title: s.title,
        description: s.description,
        audio: audios[i],
      };
    });

    res.status(200).json({
      msg: "Stories generated with titles, descriptions, and audio files",
      stories,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "An error occurred while generating stories." });
  }
});

router.post("/generate-stories-arabic", Auth, async (req, res) => {
  const { gender, inputs } = req.body;

  try {
    let originalStories =
      gender === "ولد" ? original_stories_male : original_stories_female;

    const modifiedStories = originalStories.map((story, i) => {
      const name = inputs.name;
      const sport = inputs.sport;
      const hobby = inputs.hobby;
      const color = inputs.color;

      const title = story.title
        .replace(/{name}/g, name)
        .replace(/{color}/g, color)
        .replace(/{hobby}/g, hobby)
        .replace(/{sport}/g, sport);
      const description = story.description
        .replace(/{name}/g, name)
        .replace(/{color}/g, color)
        .replace(/{hobby}/g, hobby)
        .replace(/{sport}/g, sport);

      return {
        title,
        description,
        filename: `story${i + 1}.mp3`,
      };
    });

    // Generate audio files
    const audios = await Promise.all(
      modifiedStories.map((story) => {
        const title = story.title;
        const description = story.description;
        const storyText = `${title}. ${description}`;
        const gtts = new Gtts(storyText, "ar");
        return new Promise((resolve, reject) => {
          // store gtts result in an object not a file
          let capturedOutput = Buffer.from("");
          gtts
            .stream()
            .on("data", function (chunk) {
              capturedOutput = Buffer.concat([capturedOutput, chunk]);
            })
            .on("end", function () {
              const base64Output = capturedOutput.toString("base64");
              resolve(base64Output);
            });
        });
      })
    );

    const stories = modifiedStories.map((s, i) => {
      return {
        title: s.title,
        description: s.description,
        audio: audios[i],
      };
    });

    res.status(200).json({
      msg: "Stories generated with titles, descriptions, and audio files",
      stories,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "An error occurred while generating stories." });
  }
});

router.post("/checkEnglishNumbers", Auth, async (req, res) => {
  try {
    const { image, letter } = req.body;

    const response = await axios.post(
      "https://8848-41-47-36-202.ngrok-free.app/checkEnglishNumbers",
      image,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { predictedNumber } = response.data;
    console.log("predicted - letter : ", predictedNumber, letter);

    if (predictedNumber !== letter) {
      return res.status(200).json({
        msg: "The letter is not correct",
        passed: false,
        predictedNumber,
      });
    }

    res
      .status(200)
      .json({ msg: "The letter is correct", passed: true, predictedNumber });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({ error: "Internal Server Error", error });
  }
});

router.post("/checkArabicNumbers", Auth, async (req, res) => {
  try {
    const { image, letter } = req.body;

    const response = await axios.post(
      "https://8848-41-47-36-202.ngrok-free.app/checkArabicNumbers",
      image,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { predictedNumber } = response.data;
    console.log("predicted - letter : ", predictedNumber, letter);
    if (predictedNumber !== letter) {
      return res.status(200).json({
        msg: "The letter is not correct",
        passed: false,
        predictedNumber,
      });
    }

    res
      .status(200)
      .json({ msg: "The letter is correct", passed: true, predictedNumber });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({ error: "Internal Server Error", error });
  }
});

router.post("/checkEnglishLetters", Auth, async (req, res) => {
  try {
    const { image, letter } = req.body;

    const response = await axios.post(
      "https://8848-41-47-36-202.ngrok-free.app/checkEnglishLetters",
      image,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { predictedLetter } = response.data;
    console.log("predicted - letter : ", predictedLetter, letter);
    if (predictedLetter !== letter) {
      return res
        .status(200)
        .json({ msg: "The letter is not correct", passed: false });
    }

    res.status(200).json({ msg: "The letter is correct", passed: true });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({ error: "Internal Server Error", error });
  }
});

router.post("/checkArabicLetters", Auth, async (req, res) => {
  try {
    const { image, letter } = req.body;

    const response = await axios.post(
      "https://8848-41-47-36-202.ngrok-free.app/checkArabicLetters",
      image,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { predictedLetter } = response.data;
    console.log("predicted - letter : ", predictedLetter, letter);
    if (predictedLetter !== letter) {
      return res
        .status(200)
        .json({ msg: "The letter is not correct", passed: false });
    }

    res.status(200).json({ msg: "The letter is correct", passed: true });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({ error: "Internal Server Error", error });
  }
});

export default router;
