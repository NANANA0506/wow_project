const express = require("express");
const db = require("../db");
const conn = require("../db/index");

const router = express.Router();

router.get("/finished", (req, res, next) => {
  const webtoonsSelectQuery = `
    SELECT    id,
              title,
              score,
              episode,
              being
      FROM    webtoons
  `;

  try {
    db.query(webtoonsSelectQuery, (error, webtoons) => {
      res.render("screens/webtoon/finished", { webtoons });
    });
  } catch (error) {
    console.error(error);
    return res.redirect("/");
  }
});

module.exports = router;
