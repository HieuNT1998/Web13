const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const userRouter = express.Router();

const UserModel = require('../models/userModel');

// CRUD - Create - Read - Update - Delete

// Get all: GET -> /api/users
userRouter.get("/", (req, res) => {
  UserModel.find({}, (err, users) => {
    if (err) res.status(500).send({ success: 0, err })
    else res.send({ success: 1, users });
  });
});

// Create new: POST -> /api/users
userRouter.post("/", (req, res) => {
  const { username, email, password, avatarUrl, name } = req.body;
  const salt = bcrypt.genSaltSync();
  const hashpassword = bcrypt.hashSync(password, salt);
  UserModel.create(
    { username, email, hashpassword, avatarUrl, name },
    (err, userCreated) => {
      if (err) res.status(500).send({ success: 0, err })
      else res.status(201).send({ success: 1, userCreated });
    });
});

// Update by id
userRouter.put("/:userid", (req, res) => {
  const { password, email, avatarUrl, name } = req.body;
  var updateInfo = { password, email, avatarUrl, name };
  UserModel.findById(req.params.userid, (err, userFound) => {
    if (err) res.status(500).send({ success: 0, err })
    if (!userFound) res.status(404).send({ success: 0, message: 'Ko tim thay user' });
    else {
      for (let key in updateInfo) {
        if (updateInfo[key]) {
          if (key == 'password') {
            let cmp = bcrypt.compareSync(updateInfo[key], userFound.hashpassword);
            if (!cmp) {
              var salt = bcrypt.genSaltSync();
              var Hashpassword = bcrypt.hashSync(updateInfo[key], salt);
              userFound.hashpassword = Hashpassword;
            }
          }
          else {
            userFound[key] = updateInfo[key];
          }
        }
      }
      userFound.save((err, userUpdated) => {
        if (err) res.status(500).send({ success: 0, err });
        else res.status(201).send({ success: 1, userUpdated });
      })
    }
  })

})
// userRouter.put

// Delete by id
userRouter.delete("/:userid", (req, res) => {
  UserModel.findByIdAndRemove(req.params.userid, (err) => {
    if (err) res.status(500).send({ success: 0, err });
    else if (!userFound) res.status(404).send({ success: 0, message: "not found" });
    else res.send({ success: 1, message: "Xoa thanh cong" });
  })
})
// userRouter.delete

// Get one by id
userRouter.get("/:userid", (req, res) => {
  UserModel.findById(req.params.userid, (err, userFound) => {
    if (err) res.status(500).send({ success: 0, err });
    else res.send({ success: 1, userFound });
  })
})
// userRouter.get

module.exports = userRouter;