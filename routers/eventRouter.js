const express = require("express");
const db = require("../db");
const checkLogin = require("../middlewares/checkLogin");

const router = express.Router();

router.get("/eventlist", checkLogin, (req, res, next) => {
    const selectQuery = `
        SELECT 	A.id,
        A.title,
        B.name,
        A.createdAt
        FROM	events	 A
        INNER  
        JOIN  users	 B
        ON  A.userId = B.id
        ORDER  BY	A.createdAt	 DESC
    `;
    const loggedIn = req.session.isLoggedIn;
    try {
        db.query(selectQuery, (err, rows) => {
            return res.render("screens/event/eventlist", { loggedIn, eventList: rows });
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send("데이터 조회에 실패했습니다.");
    };
});

router.get("/eventcreate", (req, res, next) => {
    res.render("screens/event/eventcreate");
})

router.post("/eventcreate", (req, res, next) => {
    const {title, content} = req.body;

    const createQuery = `
    INSERT INTO events (
        title,
        content,
        createdAt
    ) VALUES (
      "${req.body.title}",
      "${req.body.content}",
      now()
    )
    `;
    try {
        db.query(createQuery, (error, result) => {
            if(error){
                return res.status(400).send("잘못된 요청입니다. 다시 시도해주세요.");
            }
        res.redirect("/event/list");
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send("게시글 생성에 실페했습니다.");
    }
});

router.get("eventdetail/:eventId", (req, res, next) => {
    const {eventId} =req.params;

        const detailQuery = `
            SELECT  id,
                    title,
                    content,
                    createdAt
              FROM  events
             WHERE  id = ${eventId}
        `;
    
    try {
        db.query(detailQuery, (err, result) => {
            res.render("screens/event/eventdetail", {result : result[0]});
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send("접속 실페");
    };
});

router.post("/delete", (req, res, next) => {
    const {eventId} = req.body;

    try {
        const deleteQuery = `
            DELETE FROM events
             WHERE  id = ${eventId}
        `;
        db.query(deleteQuery, (error, result) => {
            if(error){
                console.error(error)
                return res.status(400).send("삭제 중 애러 발생!");
            }
            res.redirect("event/event/list");
        });
    } catch (error) {
        console.error(error)
        return res.status(400).send("삭제에 실페했습니다.");
    }
});

router.get("/update", (req, res, next) => {
    res.render("screens/event/eventupdate");
});

module.exports = router;