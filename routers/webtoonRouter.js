const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/finished", (req, res, next) => {
  console.log(req.body.id);
  console.log(req.body.id);
  console.log(req.body.id);
  console.log(req.body.id);
  console.log(req.body.id);
  const webtoonsSelectQuery = `
    SELECT    id,
              title,
              score,
              episode,
              being
      FROM    webtoons
  `;

  try {
    db.query(webtoonsSelectQuery, (err, webtoons) => {
      res.render("screens/finished", { webtoons });
    });
  } catch (error) {
    console.error(error);
    return res.redirect("/");
  }
});

module.exports = router;
