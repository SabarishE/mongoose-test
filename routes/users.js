import express from "express";

import {User} from "../models/users.js";

// importing bcrypt
import bcrypt from "bcrypt";



const router =express.Router();

// accessing the userlist DB


router.get("/",async(req,res)=>{

    const users = await User.find();
    console.log(users);
    res.send(users);
    
})

// posting data into DB

router.post("/",async(req,res)=>{

  const adduser=req.body ;
  console.log(adduser);

  // for validation purpose by using the mongoose model which contains the schema
  //if keys in both schema and adduser is same then >>const user = new User(adduser) is enough
  const user=new User({

    id:adduser.id,
    createdAt:adduser.createdAt,
    name:adduser.name,
    avatar:adduser.avatar,
  })
// a save call is made to save the new document user in DB
// try and catch is used to handle the error in validation

try{
  const newuser =await user.save();
  res.send(newuser);
}
catch(err){

  // optional to give status code either 500(internal server error)
  // or 400 (bad request error)
   res.status(500);
   res.send(err);
}

})
// check whether data got added to DB using get request in postman

//DELETE in mongoDB by "_id" in BSON by use mongoose method remove()

router.delete("/:id",async(req,res)=>{

  const { id }= req.params;
  console.log(id);

  try {

    const user = await User.findById(id);
  await user.remove();
  res.send({...user,message:"User is deleted"});
  console.log("user with above ID is deleted");
  }
 catch(err)
 {
   res.status(500);
   res.send("user not found in userlist DB");
   console.log("err: user not found");
 }

})

export default router;

const inDBstoredPassword="password@123";
// happens during sign up only
// 10 rounds of salting is default
async function genHash(){

  const password ="$2b$10$82TwaQVQjgbvlKg7Y/0EZegFDtxqIoLLXSuR6DvEePPNQ0KZCKmvm";
  const salt=await bcrypt.genSalt(10);
  const passwordHash =await bcrypt.hash(password,salt);
  console.log("salt :"+salt);
  console.log("passwordHash :" +passwordHash);
}

genHash();

async function verifyUser(){

  const userpassword="password@123";
  const isMatch=await bcrypt.compare(inDBstoredPassword,userpassword);

  if(!isMatch){
    console.log("invalid");
  }
  else{
    console.log("successful");
  }
}

verifyUser();