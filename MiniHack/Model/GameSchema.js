const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let GameSchema = new Schema({
    NameUser1:{type:String,required:true},
    NameUser2:{type:String,required:true},
    NameUser3:{type:String,required:true},
    NameUser4:{type:String,required:true},
    GradeofUser1:{type:Array},
    GradeofUser2:{type:Array},
    GradeofUser3:{type:Array},
    GradeofUser4:{type:Array},
    SumUser1:{type:Number,default:0},
    SumUser2:{type:Number,default:0},
    SumUser3:{type:Number,default:0},
    SumUser4:{type:Number,default:0},
});
module.exports = mongoose.model("Game",GameSchema);