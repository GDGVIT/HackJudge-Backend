const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const log = require("console-debug-log");
const jwt = require("jsonwebtoken");
const Evaluate = require("../models/evaluate");
const Details = require("../models/details");

router.post(
  "/",
  [
    check("Authorization"),
    check("abstract"),
    check("link"),
    check("analysis"),
    check("review"),
    check("addComments"),
    check("metrics")
  ],
  (req, res) => {
    log.debug(req.body);
    // handle validation
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array()
      });
    }

    // validate jwt
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

    // jwt verified, save evaluation object
    const details = new Evaluate({
      _id: new mongoose.Types.ObjectId(),
      abstract: req.body.abstract,
      link: req.body.link,
      analysis: req.body.analysis,
      review: req.body.review,
      addComments: req.body.addComments,
      metrics: req.body.metrics
    });

    details.save().then(result => {
      log.debug(result);
      res.status(201).send({
        message: "Create details successfully",
        createdProduct: {
          abstract: result.abstract,
          link: result.link,
          analysis: result.analysis,
          review: result.review,
          addComments: result.addComments,
          metrics: result.metrics,
          _id: result._id
        }
      });
    });
  }
);

router.get("/", [check("Authorization")], (req, res) => {
  // handle validation
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array()
    });
  }

  // validate jwt
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

  // jwt verified, find event by ID
  Details.find()
    .select(" name email abstract link _id")
    .exec()
    .then(docs => {
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: "no details found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.patch("/:evaluateId", [check("Authorization")], (req, res) => {
  const id = req.params.evaluateId;
  // handle validation
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array()
    });
  }

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
  // check fields for update
  const updateOps = {};
  for (const ops of Object.keys(req.body)) {
    updateOps[ops] = req.body[ops];
  }
  Evaluate.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "evaluation updated"
      });
    })
    .catch(err => {
      log.debug(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:evaluateId", [check("Authorization")], async (req, res) => {
  const id = req.params.evaluateId;
  // handle validation
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array()
    });
  }

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

  // find doc
  try {
    const doc = await Evaluate.findById(id).exec();
    if (doc) {
      return res.status(200).json(doc);
    } else {
      return res.status(404).json({ message: "No valid ID" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err
    });
  }
});

module.exports = router;
