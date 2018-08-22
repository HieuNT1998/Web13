const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const authRouter = express.Router();

const UserModel = require('../models/userModel');

authRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send({ success: 0, message: "Ban chua nhap mat khau hoac ten dang nhap" });
    }
    else {
        UserModel.findOne({ username }, (err, userFound) => {
            if (err) {
                res.status(500).send({ success: 0, message: "sai o day" });
            }
            else {
                if (!userFound) {
                    res.status(404).send({ success: 0, message: "ten dang nhap ko ton tai" });

                }
                else {
                    let cmp = bcrypt.compareSync(password, userFound.hashpassword);
                    if (cmp) {
                        res.send({ success: 1, message: "Dang nhap thanh cong" });
                    }
                    else res.status(401).send({ success: 0, message: "Sai Mat Khau" });
                }
            }
        })
        // .then(userFound=>{
        //     if(!userFound) res.status(404).send({success:0,message:"ten dang nhap ko ton tai"});
        //     else{
        //         let cmp = bcrypt.compare(password,userFound.hashpassword);
        //         if(cmp) res.send({success:1,message:"Dang nhap thanh cong"});
        //         else res.status(401).send({success:0,message:"Sai Mat Khau"});
        //     }
        // })
        // .catch(error => res.status(500).send({success:0,error}));
    }
})
module.exports = authRouter;