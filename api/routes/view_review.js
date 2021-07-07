const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Evaluate = require("../models/evaluate");

router.get("/", async (req, res) => {
  // verify jwt
  const token = req.header("Authorization");
  let email;
  try {
    email = jwt.verify(token, process.env.JWT_PASS);
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      message: err
    });
  }

  // verify if admin
  try {
    let user = await Admin.findOne({ email: email });
    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "You are forbidden from modifying this resource" });
    }
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: err });
  }

  Evaluate.find()
    .select("_id abstract link analysis review addComments metrics isSelected isStandBy")
    .exec()
    .then(docs => {
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: "no entries found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:vrId", async (req, res) => {
  // verify jwt
  const token = req.header("Authorization");
  let email;
  try {
    email = jwt.verify(token, process.env.JWT_PASS);
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      message: err
    });
  }

  // verify if admin
  try {
    let user = await Admin.findOne({ email: email });
    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "You are forbidden from modifying this resource" });
    }
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: err });
  }

  const id = req.params.vrId;
  Evaluate.findById(id)
    .select("_id abstract link analysis review addComments metrics isSelected isStandBy")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valid id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
