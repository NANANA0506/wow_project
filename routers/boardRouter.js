const express = require("express");
const db = require("../db");
const conn = require("../db/index") 

const router = express.Router();

router.get("/question", (req, res, next) => {
    const selectQuery = `
        SELECT  id,
                title,
                content,
                createdAt
          FROM  board 
         ORDER  BY  content   ASC 
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

router.post("/create", (req, res, next) => {
    res.render("screens/questioncreate");
});

router.post("/create", (req, res, next) => {
    const createQuery =`
    INSERT INTO board (
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
                return res.status(400).send("잘못된 요청 입니다. 다시 시도해주세요.");
            }
            res.redirect("screens/question");
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send("게시글 생성에 실패했습니다.");
        
    }

}); 

router.post("/update/:updateId", (req, res, next) => {
    const {title, content} = req.body;
    const {updateId} = req.params;
    try {
        updateQuery = `
        UPDATE board
           SET title = ${title},
               content = ${content}
         WHERE id = ${id}
    `;
    conn.query(updateQuery, (error, result) => {
        if(error){
            return res.status(400).send("게시글을 수정중 에러 발생 !");
        }
    });
    res.redirect("screens/question");
    } catch (error) {
      console.error(error)
      res.status(400).send("게시글을 수정할 수 없습니다.")
    }
});

router.post("/delete", (req, res, next) => {

    const{id } = req.body;

    try {
        const deleteQuery = `
            DELETE FROM board
             WHERE id = ${id}
        `;
        conn.query(deleteQuery, (error, result) => {
            if(error){
                return res.status(400).send("삭제 중 에러 발생!");
            }
            res.redirect("/board/question");
        });
    } catch (error) {
        console.error(error)
        return res.status(400).send("삭제에 실페했습니다.");
    }
});


module.exports = router;