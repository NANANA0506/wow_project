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
          FROM  events
         ORDER  BY  id      ASC
`;
    try {
        db.query(selectQuery, (err, events) => {

            console.log(err);
            console.log(events);

            res.render("screens/eventlist", {events});
        })
    } catch (error) {
        console.error(error);
        return res.redirect("/");
    }
});

router.get("/create", (req, res, next) => {
    res.render("screens/eventcreate");
})

router.post("/create", (req, res, next) => {
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
        conn.query(createQuery, (error, result) => {
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

router.get("/detail/:eventId", (req, res, next) => {
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
        conn.query(detailQuery, (err, result) => {
            res.render("screens/eventdetail", {result : result[0]});
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
        conn.query(deleteQuery, (error, result) => {
            if(error){
                console.error(error)
                return res.status(400).send("삭제 중 애러 발생!");
            }
            res.redirect("/event/list");
        });
    } catch (error) {
        console.error(error)
        return res.status(400).send("삭제에 실페했습니다.");
    }
});

router.get("/update", (req, res, next) => {
    res.render("screens/eventupdate");
});

module.exports = router;