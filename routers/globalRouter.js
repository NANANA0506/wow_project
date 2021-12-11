const db = require("../db");
const express = require("express");
const checkLogin = require("../middlewares/ckeckLogin");
const mysql2 = require("mysql2");

const router = express.Router();

router.get("/", checkLogin, (req, res, next) => {
  const loggedIn = req.session.isLoggedIn;

  console.log(req.session);

  res.render("screens/home", { loggedIn });
});

// router.get("/", (req, res, next) => {
//   res.render("screens/home");
// });

router.get("/signin", (req, res, next) => {
  res.render("screens/signin");
});
router.post("/signin", (req,res)=>{
    const loginQuery = `
    SELECT email,
           password
      FROM users
     WHERE email = "${req.body.email}"
       AND password = "${req.body.password}"  
    `;
    db.query(loginQuery,(error,result)=>{
        if(error) {
            console.error(error);
            return res.status(400).send("로그인 실패");
        }else{
            if(email = req.body.email , password = req.body.password) {
                return res.status(200).send("로그인 성공");
            }else{
                return res.status(403).send("로그인 실패");
            }
        }
    })
});

router.get("/signup", (req, res, next) => {
  res.render("screens/signup");
});

router.post("/signup", (req, res, next) => {

    const userCheckQuery=`
        SELECT email
          FROM users
         WHERE email="${req.body.email}"`;
        
    db.query(userCheckQuery,(error,result)=>{
        if(error) {
            console.log(error);
            return res.status(403).send("다시 시도해주세요");
        }else{
            if(result.length > 0){
                return res.status(403).send("이메일 이미 존재합니다.");
            }else{
                const signupQuery = `
                    INSERT INTO users (
                        name,
                        birth,
                        gender,
                        phone_number,
                        email,
                        password
                    )VALUES (
                        "${req.body.name}",
                        "${req.body.birth}",
                        "${req.body.gender}",
                        ${req.body.phone_number},
                        "${req.body.email}",
                        "${req.body.password}"
                )`;

                db.query(signupQuery,(error,resutl)=>{
                    if(error){
                        console.error(error);
                        return res.status(400).send("회원가입 실패");
                    }else{
                        res.status(201).send("회원가입 성공")
                    }
                })
            }
        }
    })


});

router.get("/help", (req, res, next) => {
  res.render("screens/help");
});

router.get("/partcipants", (req, res, next) => {
  res.render("screens/partcipants");
});

router.get("/notice", (req, res, next) => {
  res.render("screens/notice");
});

router.get("/event", (req, res, next) => {
  res.render("screens/event");
});

router.get("/termsofuse", (req, res, next) => {
  res.render("screens/termsofuse");
});

router.get("/naverwebtoon", (req, res, next) => {
  res.render("screens/naverwebtoon");
});
module.exports = router;
