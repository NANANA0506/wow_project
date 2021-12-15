const express = require("express");
const db = require("../db");
const conn = require("../db/index");

const router = express.Router();

router.get("/list", (req, res, next) => {
    const selectQuery = `
        SELECT  id,
                title,
                content,
                createdAt
          FROM  notices
         ORDER  BY  id      ASC
    `;

    try {
        db.query(selectQuery, (err, result) => {
            console.log(err);
            console.log(notices);

            res.render("screens/notice/noticelist", {notices});
        });
    } catch (error) {
        console.error(error);
        return res.redirect("/");
    }
});

router.get("/create", (req, res, next) => {
    res.render("screens/notice/noticecreate");
})

router.post("/create", (req, res, next) => {
    const {title, content} = req.body;

    const createQuery = `
        INSERT INTO notices (
            title,
            content,
            createdAt,
        )   VALUES (
            "${req.body.title}",
            "${req.body.content}"
            now()
        )
    `;
    try {
        conn.query(createQuery, (error, result) => {
            if(error){
                console.error(error);
                return res.status(400).send("잘못된 요청입니다. 다시 시도해주세요.");
            }
        res.redirect("/notice/list");
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send("게시글 생성에 실페했습니다.");
    }
});

router.get("/detail/:noticeId", (req, res, next) => {
    const {noticeId} = req.params;

        const detailQuery = `
            SELECT  id,
                    title,
                    content,
                    createdAt
              FROM  notices
             WHERE  id  =   ${noticeId}
        `;
    
    try {
        conn.query(detailQuery, (err, result) => {
            res.render("screens/notice/noticedetail", {result : result[0]});
        });
    } catch (error) {
        console.error(error);
        return  res.status(400).send("접속실페");
    };
});

router.post("/delete", (req, res, next) => {
    const {noticeId} = req.body;

    try {
        const deleteQuery = `
            DELETE FROM notices
             WHERE  id =   ${noticeId}
        `;

        conn.query(deleteQuery, (error, result) => {
            if(error){
                console.error(error);
                return res.status(400).send("삭제 중 에러 발생!");
            }
            res.redirect("/notice/list");
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send("삭제에 실페했습니다.");
    }
});

module.exports = router;