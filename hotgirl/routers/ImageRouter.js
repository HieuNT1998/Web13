const express = require('express');
const imageRouter = express.Router();
const ImageModel = require('../models/image');

// CRUD - Create - Read - Update - Delete

// Get all: GET -> /api/users
imageRouter.get("/", (req, res) => {
  ImageModel.find({})
    .populate('owner')
    .exec((err, images) => {
      if (err) res.status(500).send({ success: 0, err })
      else res.send({ success: 1, images });
    });
});

// Create new: POST -> /api/users
imageRouter.post("/", (req, res) => {
  console.log("run");
  const { imageUrl,description,owner } = req.body;
  ImageModel.create(
    { imageUrl,description,owner },
    (err, imageCreated) => {
      if (err) res.status(500).send({ success: 0, err });
      else res.status(201).send({ success: 1, imageCreated });
    });
});

// Update by id
imageRouter.put("/:imageId", (req, res) => {
  const { view, like, comments, description,owner } = req.body;
  var updateInfo = { view, like, comments, description,owner };
  ImageModel.findById( req.params.imageId,(err,imageFound)=>{
    
    if(err) res.status(500).send({success:0,err})
    if(!imageFound) res.status(404).send({success:0,message:'Ko tim thay user'});
    else{
     
      for(let key in updateInfo){
        if(updateInfo[key]) imageFound[key]=updateInfo[key];
      }
      
      imageFound.save((err,imageUpdated)=>{
        if(err) res.status(500).send({success:0,errors:"loi"});
        else res.status(201).send({success:1,imageUpdated});
      })
     
    }
  })
  
})
// userRouter.put

// Delete by id
imageRouter.delete("/:imageid",(req,res)=>{
  ImageModel.findByIdAndRemove(req.params.imageid,(err,imageDeleted)=>{
    if(err) res.status(500).send({success:0,err});
    else if(!imageDeleted) res.status(404).send({success:0,message:"not found"});
    else res.send({success:1,message:"Xoa thanh cong"});
  })
})
// userRouter.delete

// Get one by id
imageRouter.get("/:userid",(req,res)=>{
  ImageModel.findById(req.params.userid)
      .populate('owner')
      .populate('comments.user',"username avatarUrl name")
      .exec((err,imageFound)=>{
        if(err) res.status(500).send({success:0,err});
        else res.send({success:1,imageFound});
      });
})
// userRouter.get



module.exports = imageRouter;