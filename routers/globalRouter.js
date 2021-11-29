const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("screens/home");
});
router.get("/login" , (req,res,next)=>{
    res.render("screens/login");
});

module.exports = router;