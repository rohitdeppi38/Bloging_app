const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended:false}));

mongoose
.connect("mongodb://localhost:27017/blogify")
.then((error)=>console.log("mongodb is connected"));

app.set("view engine","ejs");
app.set("views",path.resolve('./views'));

app.get('/',(req,res)=>{
    res.render("home");
})

app.use("/user",userRoute);

app.listen(PORT,()=>console.log(`server is started at ${PORT}`));