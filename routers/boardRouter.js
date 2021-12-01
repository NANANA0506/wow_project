const express = require("express");
const db = require("../db");
const mysql2 = require("mysql2");
const conn = require("../db");

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

            console.log(err);
            console.log(boards);
            res.render("screens/question", {boards});

        });
    
    } catch (error) {
        console.error(error);
        return res.redirect("/");
    };
});
router.get("/create", (req, res, next) => {
    res.render("screens/create");
})

router.post("/create", (req, res, next) => {
    const { title, content } = req.body;

    const createQuery =`
    INSERT INTO board (
        title,
        content,
        createdAt
    ) VALUES (
      "${title}",
      "${content}",
      now()
    )
    `;
    try {
        conn.query(createQuery, (error, result) => {
            if(error){
                return res.status(400).send("잘못된 요청 입니다. 다시 시도해주세요.");
            }
        res.redirect("/board/question");
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send("게시글 생성에 실패했습니다.");
        
    }
}); 

module.exports = router;