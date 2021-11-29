const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mysql2 = require("mysql2");

const dbConfig = {
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    dbName : process.env.DB_NAME,
};

const conn =mysql2.createConnection({
    host : dbConfig.host,
    port : dbConfig.port,
    user : dbConfig.user,
    password : dbConfig.password,
    database : dbConfig.dbName,

});

const router = express.Router();

router.get("/create", (req, res, next) => {
    res.render("board/create");
});

router.post("create", (req, res, next) => {
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
        res.redirect(`/board/list/${result.insertId}`);
        });
        
    } catch (error) {
        console.error(error);
        return res.status(400).send("게시글 생성에 실페했습니다.");
    }
});


module.exports = router;