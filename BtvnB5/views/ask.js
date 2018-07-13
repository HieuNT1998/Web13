const express = require("express");
let app = express();



app.use(express.static("views"));
app.use(express.static("views/layouts"));


const hds=require("express-handlebars");

app.engine("handlebars",hds({ defaultLayout:"main"}));
app.set("view engine","handlebars");
app.get('/',function(req,res){
    res.render("about");
});
