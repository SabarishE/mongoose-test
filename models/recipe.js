import mongoose from "mongoose";

//creating schmema for recipes

const userschema= new mongoose.Schema({

    title:{
type:string,
required:true,
    },
    ings:[
        {
            type:string
        }
    ],
    favourite:{
        type:Boolean,
        default:false
    }
})