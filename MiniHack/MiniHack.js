const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');


const hds = require("express-handlebars");
app.engine("handlebars", hds({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.get("/",(req,res)=>{
    res.render("TaoVan");
})



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/PlayGame",(req,res)=>{
    var content = fs.readFileSync("UserName.json")
    var Object= JSON.parse(content);
    console.log(Object);
    res.render("SaveRound",{
        player:Object
    });
})




app.post("/play",(req,res)=>{
    let NewVan={
        User1 : req.body.player1,
        User2 : req.body.player2,
        User3 : req.body.player3,
        User4 : req.body.player4,
    }
    console.log(NewVan);
    fs.writeFileSync("UserName.json",JSON.stringify(NewVan));
    res.redirect("/PlayGame");
})

app.listen(1998, (err) => {
    if (err) console.log(err);
    else console.log("Server ready !");
}) 