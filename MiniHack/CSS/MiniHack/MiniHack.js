const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const GameModel = require('./Model/GameSchema');

const hds = require("express-handlebars");
app.engine("handlebars", hds({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.get("/", (req, res) => {
    res.render("TaoVan");
})



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/PlayGame/:GameId", (req, res) => {
    GameModel.findOne({ _id: req.params.GameId }, function (err, GameFound) {
        res.render("SaveRound", {
            player: GameFound
        });
    })

})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/AddRound/:GameId/:User", (req, res) => {
    var GameID = req.params.GameId;
    var USER = req.params.User;
    console.log("chua tim:"+req.body.arr);
    GameModel.findOne({ _id: GameID }, (err, GameFound) => {
        if (err) {
            res.status(500).send({ success: 0, errMsg: err });
        }
        else {
            console.log(req.body.arr);
            if(USER == "User1") GameFound.GradeofUser1 = req.body.arr;
            if(USER == "User2") GameFound.GradeofUser2 = req.body.arr;
            if(USER == "User3") GameFound.GradeofUser3 = req.body.arr;
            if(USER == "User4") GameFound.GradeofUser4 = req.body.arr;
            GameFound.save((err) => {
                if (err) console.log(err);
                else console.log("update success");
            });
        }
    });
})
app.post("/play", (req, res) => {
    let NewVan = {
        NameUser1: req.body.player1,
        NameUser2: req.body.player2,
        NameUser3: req.body.player3,
        NameUser4: req.body.player4,
    }
    GameModel.create(NewVan, (err, GameCreated) => {
        var GameId = GameCreated._id;
        res.redirect("/PlayGame/" + GameId);
    })

})


mongoose.connect("mongodb://localhost:27017/ScoreKeeper", { useNewUrlParser: true }, function (err) {
    if (err) console.log(err);
    else console.log("DB ready")
})

app.listen(1998, (err) => {
    if (err) console.log(err);
    else console.log("Server ready !");
}) 