import express, { response } from "express";

// importing mongoose

import mongoose from "mongoose";

import router from "./routes/users.js";

//change the port from 3000 to both local and heroku compatible  port, here PORT is a variable
const PORT = process.env.PORT || 5000;




const app=express();

app.use(express.json());
// testing
// app.get("/",(req,res)=>{res.send("hi chieffffff")});

app.listen(PORT,console.log("server started"));

console.log("hi");

// mongoose testing starts here

// mongodb://localhost/userlist
// new url from mongo atlas (cluster > connect > connect your application > copy string)
// change password and change database name to userlist in last block of new url, after slash
const url= "mongodb+srv://SabarishE:sabarishe@cluster0.eeimf.mongodb.net/userlist";
mongoose.connect(url,{useNewUrlParser:true});

const con=mongoose.connection;
  // to check mongoDB is connected or not
con.on("open",()=>console.log("MongoDB in connected"));


// router is used to access the DB


app.use("/users",router);