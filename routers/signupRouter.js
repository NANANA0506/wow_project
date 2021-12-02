const express = require("express");
const db = require("../db");
const mysql2 = require("mysql2");
const conn = require("../db");

const router = express.Router();

    router.post("/add", (req,res,next)=>{
        const personemailQuery= `
            SELECT email
            FROM people
            WHERE email="${req.body.email}"
        `;
    conn.query(personemailQuery,(error, result)=>{
        if(error){
            console.log(error);
            return res.status(403).send("다시 시도해주세요.");
        }else{
            if(result.length > 0) {
                return res.send(403).send("같은 이메일이 존재합니다.");
            }else{
                const personinformationsQuery=`
                    INSERT INTO people (
                        name,
                        birth,
                        gender,
                        phone_number,
                        email,
                        password
                    ) VALUSE (
                        "${req.body.name}",
                        "${req.body.birth}",
                        "${req.body.gender}",
                        "${req.body.phone_number}",
                        "${req.body.email}",
                        "${req.body.password}",
                    )`;
                    conn.query(personinformationsQuery,(error,result)=>{
                        if(error) {
                            console.error(error);
                            return res.status(400).send("회원가입에 실패했습니다.");
                        }else{
                            res.status(201).send("회원가입에 성공했습니다.");
                        }
                    })
                        
            }
        }
    })
});
module.exports=router;