const mongoose=require("mongoose");
const express=require("express");

const dataRoute=require("./controller/dataRoute");

const cors= require("cors");
const bodyParser= require("body-parser");
mongoose.set("strictQuery",true);


mongoose.connect("mongodb+srv://swarnimadarsh:12345@cluster0.nydio.mongodb.net/db");


var db=mongoose.connection;
db.on("open",()=> console.log("connected to database"));
db.on("error",()=> console.log("error"));

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.use("/dataRoute",dataRoute);


app.listen(4000, ()=>{
    console.log("server started at 4000");
})