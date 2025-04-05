const User = require("../models/userModel");
const { createToken } = require("../utils/createToken");
const bcrypt=require('bcryptjs');


//Register Admin
const registerUser=async (req,res)=>{

    const {name,email,password}=req.body;

    if(!email || !name || !password){
        return res.status(400).json({message:"All Fields Are Required"});
    }


    const user=await User.findOne({email})

    if (user) {

        return res.status(400).json({message:'Email Already Exist'});
        
    } else {

        const registerUser=await User.create({
            name,
            password,
            email
        });

        const Token=await createToken({
            id:registerUser._id,
            role:registerUser.role
        });

        res.cookie('accessToken',Token,{
            httpOnly:true,
            sameSite:true,
            expires:new Date(new Date( Date.now() + 7 * 24 * 60 * 60 * 1000))
        })


        res.status(201).json({Token,message:'Registration Successfull'});
        
    }

}


//Login Admin
const loginUser=async (req,res)=>{

    const {email,password}=req.body;

    try {

        if(!email || !password){

            return res.status(400).json({message:'All Fields are required'})

        }

        const user=await User.findOne({email}).select('+password')

        if(!user){
           return res.status(400).json({message:'Invalid Credentials'})
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }


        const token=await createToken({
            id:user._id,
            role:user.role
        })

      
        res.cookie('accessToken',token,{
            httpOnly:true,
            sameSite:true,
            expires:new Date(new Date( Date.now() + 7 * 24 * 60 * 60 * 1000))
        })


        res.status(200).json({token,message:"Login Successfully"})

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}



module.exports={
    registerUser,
    loginUser
}