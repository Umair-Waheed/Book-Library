import mongoose from "mongoose";

const Schema=mongoose.Schema;

const userSchema= new Schema({
    name:{
       type: String,
       required:true,
    },
        
    email:{
     type:String,
     required:true,
     unique:true
    },
    password:{
        type:String,
        required:true
    }
},
{timestamps:true}
)


const userModel=new mongoose.model("User",userSchema);

export default userModel;