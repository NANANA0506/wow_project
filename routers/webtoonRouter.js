const express = require("express");
const db = require("../db");
const conn = require("../db/index") 

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

  console.log("asdlaklsdklasdk");
  console.log("asdlaklsdklasdk");
  console.log("asdlaklsdklasdk");
  console.log("asdlaklsdklasdk");

  try {
      db.query(webtoonsSelectQuery, (error, webtoons) => {
        console.error(error);
        console.log(webtoons);
        res.render("screens/finished", { webtoons });
      });
    } catch (error) {
      console.error(error);
      return res.redirect("/");
    };
});
  

module.exports = router;