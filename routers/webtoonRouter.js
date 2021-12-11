const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/finished", (req, res, next) => {
  const finishedWebtoonsSelectQuery = `
  SELECT  id,
          title,
          score,
          episode,
          being,
          publish
    FROM  webtoons
   WHERE  being		LIKE	'완결'
  `;
  try {
    db.query(finishedWebtoonsSelectQuery, (err, finishedWebtoons) => {
      console.log(err);
      res.render("screens/finished", { finishedWebtoons });
    });
  } catch (error) {
    console.error(error);
    return res.redirect("/");
  }
});

router.get("/kakaoWeb", (req, res, next) => {
  const kakaoWebtoonsSelectQuery = `
  SELECT  id,
		      title,
		      score,
		      episode,
		      being,
		      publish,
          days
    FROM  webtoons
   WHERE  publish		LIKE	'카카오웹툰'
     AND  being		  LIKE	'연재'
  `;
  try {
    db.query(kakaoWebtoonsSelectQuery, (err, kakaoWebtoons) => {
      console.log(err);
      res.render("screens/kakaoWeb", { kakaoWebtoons });
    });
  } catch (error) {
    console.error(error);
    return res.redirect("/");
  }
});

router.get("/kakaoPage", (req, res, next) => {
  const kakaoPagesSelectQuery = `
  SELECT  id,
		      title,
		      score,
		      episode,
		      being,
		      publish,
          days
    FROM  webtoons
   WHERE  publish		LIKE	'카카오페이지'
     AND  being		  LIKE	'연재'
  `;
  try {
    db.query(kakaoPagesSelectQuery, (err, kakaoPages) => {
      console.log(err);
      res.render("screens/kakaoPage", { kakaoPages });
    });
  } catch (error) {
    console.error(error);
    return res.redirect("/");
  }
});

router.get("/naverWeb", (req, res, next) => {
  const naverWebsSelectQuery = `
  SELECT  id,
		      title,
		      score,
		      episode,
		      being,
		      publish,
          days
    FROM  webtoons
   WHERE  publish		LIKE	'네이버웹툰'
     AND  being		  LIKE	'연재'
  `;
  try {
    db.query(naverWebsSelectQuery, (err, naverWebtoons) => {
      console.log(err);
      res.render("screens/naverWeb", { naverWebtoons });
    });
  } catch (error) {
    console.error(error);
    return res.redirect("/");
  }
});

router.get("/naverSeries", (req, res, next) => {
  const naverSeriesSelectQuery = `
  SELECT  id,
		      title,
		      score,
		      episode,
		      being,
		      publish,
          days
    FROM  webtoons
   WHERE  publish		LIKE	'네이버시리즈'
     AND  being		  LIKE	'연재'
  `;
  try {
    db.query(naverSeriesSelectQuery, (err, naverSeries) => {
      console.log(err);
      res.render("screens/naverSeries", { naverSeries });
    });
  } catch (error) {
    console.error(error);
    return res.redirect("/");
  }
});

router.post("/webtoonsCreate", (req, res) => {
  const webtoonsInsertQuery = `    
      INSERT INTO reviews (
        title,
        score,
        episode,
        being,
        publish,
        days
      )	VALUES	(
        "${req.body.title}",
        ${req.body.score},
        ${req.body.episode},
        "${req.body.being}"
        "${req.body.publish}",
        "${req.body.days}"
      )
      `;

  try {
    db.query(webtoonsInsertQuery, (error, CreWebtoons) => {
      if (error) {
        console.error(error);
      }
      res.redirect("/createWebtoon");
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

module.exports = router;
