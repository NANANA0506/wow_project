const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/question", (req, res, next) => {
    const selectQuery = `
        SELECT  id,
                title,
                content,
                createdAt
          FROM  board
    `;

    try {
        db.query(selectQuery, (err, boards) => {
            res.render("screens/question", {boards});
        });
    } catch (error) {
        console.error(error);
        return res.redirect("/");
    };
});

module.exports = router;