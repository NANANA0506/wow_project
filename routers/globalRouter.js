const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("screens/home");
});

router.get("/signin" , (req,res,next)=>{
    res.render("screens/signin");
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