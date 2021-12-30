const express = require("express");
const db = require("../db");
const checkLogin = require("../middlewares/checkLogin");

const router = express.Router();

router.get("/faqlist", checkLogin, (req, res, next) => {
    const selectQuery = `
        SELECT  A.id,
                A.title,
                B.name,
                A.createdAt
          FROM  faq     A
         INNER
          JOIN  users   B
            ON  A.userId = B.id
         ORDER  BY A.createdAt  DESC
    `;
    const loggedIn = req.session.isLoggedIn;
    try {
        db.query(selectQuery, (err, rows) => {
            return res.render("screens/faq/faqlist", {  loggedIn, faqList: rows });
    });
    } catch (error) {
        console.error(error);
        return res.status(400).send("데이터 조회에 실패했습니다.");
    };
});

router.get("/faqdetail", checkLogin, (req, res, next) => {

    const detailQuery =`
        SELECT  A.id,
                A.title,
                A.content,
                B.name,
                A.createdAt
          FROM  faq     A
         INNER  
          JOIN  users   B
            ON  A.userId = B.id
         WHERE  A.id = ${req.query.bid}
    `;

    const loggedIn = req.session.isLoggedIn;

    try {
        db.query(detailQuery, (err, rows) => {

            res.render("screens/faq/faqdetail", { loggedIn, bData: rows[0] });
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send("detail page에 접근할수 없습니다.");
    };
});

router.get("/faqcreate", checkLogin, (req, res, next) => {
    const loggedIn = req.session.isLoggedIn;
    res.render("/screens/faq/faqcreate", {loggedIn});
});

router.post("/faqcreate", (req, res, next) => {

    const createQuery =`
        INSERT  INTO    faq (
            title,
            content,
            createdAt,
            updatedAt,
            userId
        )   VALUES  (
            "${req.body.input_title}",
            "${req.body.input_content}"
            now(),
            now(),
            ${req.session.userId}
        )
    `;

    try {
        db.query(createQuery, (error, faq) => {
            if(error){
                console.error(error);
                return res.redirect("faq/faqlist");
            }
        res.redirect("/faq/faqlist");
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send("게시글 생성에 실패했습니다.");
    };
});

router.get("/faqupdate", (req, res, next) => {
    res.render("screens/faq/faqupdate");
});

router.post("/faqupdate", (req, res, next) => {
    const{faqId} = req.body;
    const {faqtitle, faqcontent} = req.body;

    const updateQuery = `
        UPDATE  faq
           SET  title = "${faqtitle}",
                content = "${faqcontent}",
                updatedAt = now()
         WHERE  id = ${faqId}
    `;
    try {
        db.query(updateQuery, (error, faq) => {
            if(error){
                console.error(error);
                return res.status(400).send("게시글 수정중 애러 발생!");
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).send("게시글을 수정할 수 없습니다.")
    }
    res.redirect("/faq/faqlist");
});

router.post("/faqdelete", (req, res, next) => {
    const {faqId} = req.body;

    try {
        const deleteQuery =`
            DELETE  FROM    faq
             WHERE  id = ${faqId}
        `;
        db.query(deleteQuery, (error, faq) => {
            if(error){
                console.error(error);
                return res.status(400).send("삭제 중 애러 발생!");
            }
            res.redirect("/faq/faqlist");
        });
    } catch (error) {
        console.error(error);
        return  res.status(400).send("삭제에 실패했습니다.");
    }
});

module.exports = router;