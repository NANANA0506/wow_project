const express = require("express");
const db = require("../db");
const conn = require("../db/index");

const router = express.Router();

router.get("/list", (req, res, next) => {
    res.render("screens/eventlist");
});

router.get("/create", (req, res, next) => {
    res.render("screens/eventcreate");
});

router.get("/detail", (req, res, next) => {
    res.render("screens/eventdetail");
});

router.get("/update", (req, res, next) => {
    res.render("screens/eventupdate");
});

module.exports = router;