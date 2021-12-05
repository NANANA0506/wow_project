const db = require("../db");
const express = require("express");
const checkLogin = require("../middlewares/ckeckLogin");
const mysql2 = require("mysql2");

const router = express.Router();

router.get("/", checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;

  console.log(req.session);

  res.render("screens/home", { loggedIn });
});

// router.get("/", (req, res, next) => {
//   res.render("screens/home");
// });

router.get("/signin", (req, res, next) => {
  res.render("screens/signin");
});
router.get("/signup", (req, res, next) => {
  res.render("screens/signup");
});

router.post("/signup", (req, res, next) => {
  const signupQuery = `
        INSERT INTO people (
            name,
            birth,
            gender,
            phone_number,
            email,
            password
        ) VALUES (
            "${req.body.name}",
            "${req.body.birth}",
            "${req.body.gender}",
            ${req.body.phone_number},
            "${req.body.email}",
            "${req.body.password}"
        )
    `;

  try {
    db.query(signupQuery, (error, signups) => {
      if (error) {
        console.log(error);
      }
      res.redirect("screens/signup");
    });
  } catch (error) {
    console.log(error);
    res.redirect("screens/signup");
  }
});

router.get("/help", (req, res, next) => {
  res.render("screens/help");
});

router.get("/partcipants", (req, res, next) => {
  res.render("screens/partcipants");
});

router.get("/notice", (req, res, next) => {
  res.render("screens/notice");
});

router.get("/event", (req, res, next) => {
  res.render("screens/event");
});

router.get("/termsofuse", (req, res, next) => {
  res.render("screens/termsofuse");
});

module.exports = router;
