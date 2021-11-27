const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("screens/home");
});

module.exports = router;