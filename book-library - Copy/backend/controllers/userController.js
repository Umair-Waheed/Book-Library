import userModel from "../models/UserModel.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"

const register=async(req,res)=>{

    try{
    const {name,email,password}=req.body;

    const IsUserExist=await userModel.findOne({email});

    if(IsUserExist){
        return res.json({success:false, message: "User already exist!"});
    }

    const hashPassword=await bcrypt.hash(password,10);

    await userModel.create({
        name,
        email,
        password:hashPassword
    });
    
    return res.json({success:true, message: "User register successfull."});

    }catch(error){
        return res.json({success:false, message: error.message});

    }
}

const login = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await userModel.findOne({ email });

        if(!user){
            return res.json({success:false, message: "User does not exist!"});
        }   

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false, message: "Invalid credentials"});
        }
        const token=generateToken(user._id);

        return res.json({success:true,token,
            user:user._id,
            name:user.name,
            email:user.email
        })
    }catch(error){
        return res.json({success:false, message: error.message});

}}

export {register,login};