const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');

const apiRouter = require('./routers/ApiRouter');

let app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

app.get("/", (req, res) => {
  res.send("Techkids hotgirl Server");
});

app.use("/api", apiRouter);

mongoose.connect("mongodb://localhost:27017/techkids-hotgirl", { useNewUrlParser: true }, function (err) {
    if (err) console.log(err);
    else console.log("DB ready")
})

const port = 6969;
app.listen(port, (err) => {
  if(err) console.error(err)
  else console.log(`Server is listening at ${port}`);
});