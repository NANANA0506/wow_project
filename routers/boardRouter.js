const express = require("express");
const { resume } = require("../db");
const db = require("../db");
const conn = require("../db/index") 

const router = express.Router();

router.get("/question", (req, res, next) => {
    const selectQuery = `
        SELECT  id,
                title,
                content,
                createdAt
          FROM  boards
         ORDER  BY  content   ASC 
`;

    try {
        db.query(selectQuery, (err, boards) => {

            console.log(err);
            console.log(boards);

            res.render("screens/questionlist", {boards});
        });
    
    } catch (error) {
        console.error(error);
        return res.redirect("/");
    };
});
router.get("/create", (req, res, next) => {
    res.render("screens/questioncreate");
})


router.post("/create", (req, res, next) => {
    const {title, content} = req.body;


    const createQuery =`
    INSERT INTO boards (
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
        res.redirect("/board/question");
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send("게시글 생성에 실패했습니다.");
        
    }

}); 
router.get("update", (req, res, next) => {
    res.render("screens/questionupdate");
})


router.post("/update/:updateId", (req, res, next) => {
    const {title, content} = req.body;
    const {boardId} = req.body;
    try {
        updateQuery = `
        UPDATE boards
           SET title = ${title},
               content = ${content}
         WHERE id = ${boardId}
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

    const {boardId} =req.body;

    try {
        const deleteQuery = `
            DELETE FROM boards
             WHERE id = ${boardId}
        `;
        conn.query(deleteQuery, (error, result) => {
            if(error){
                console.error(error)
                return res.status(400).send("삭제 중 에러 발생!");
            }
            res.redirect("/board/question");
        });
    } catch (error) {
        console.error(error)
        return res.status(400).send("삭제에 실페했습니다.");
    }
});

router.get("/detail/:boardId", (req, res, next) => {
    const {boardId} =req.params;
 
        const detailQuery =`
            SELECT  id,
                    title,
                    content,
                    createdAt
              FROM  boards
             WHERE  id = ${boardId}
        `;
     
    try {
        conn.query(detailQuery, (err, result) => {
            res.render("screens/questiondetail", {result : result[0]});  
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send("접속 실페");
    };
});

module.exports = router;