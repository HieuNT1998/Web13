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
    GradeofUser4:{type:Array}
});
module.exports = mongoose.model("Game",GameSchema);