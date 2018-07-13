const express = require("express");
let app = express();



app.use(express.static("views"));
app.use(express.static("views/layouts"));


const hds = require("express-handlebars");

var questionlist = require('./listcauhoi.json');

app.engine("handlebars", hds({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.get('/', function (req, res) {
    let questionRandom = questionlist[Math.floor(Math.random() * questionlist.length)];
    res.render("answer", {
        question: questionRandom,
    });
});

app.get('/ask', function (req, res) {
    res.render("about")

});
const fs = require('fs');

app.get('/ketquavote/:questionId', function (req, res) {
    let question = questionlist[req.params.questionId - 1];
    //console.log(req.params.questionId);
    res.render("Ketquavote", {
        question,
        //total:3
        total: question.yes + question.no
    })

});

app.get('/traloi/:questionId/:vote', function (req, res) {
    console.log("Id:" + questionlist[req.params.questionId].id)
    //console.log( req.params.vote + questionlist[req.params.questionId-1][req.params.vote]);
    questionlist[req.params.questionId - 1][req.params.vote]++;
    // console.log( req.params.vote + questionlist[req.params.questionId-1][req.params.vote]);
    fs.writeFileSync('./listcauhoi.json', JSON.stringify(questionlist));
    res.redirect("/ketquavote/" + req.params.questionId);
})

app.post("/question/add",(req, res)=> {
    let NewQuestion = {
        content : req.body.questionContent,
        yes :0,
        no:0,
        id: questionlist.length

    }
    questionlist.push(NewQuestion);
    fs.writeFileSync('./questions.json',JSON.stringify(questionlist));
    res.redirect('/answer/'+NewQuestion.id);

})

app.listen(6969, function (err) {
    if (err) console.error(err);
    else console.log("sever ");
});