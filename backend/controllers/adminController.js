const Admin = require("../models/adminModel");
const { createToken } = require("../utils/createToken");
const bcrypt=require('bcryptjs')


//Register Admin
const registerAdmin=async (req,res)=>{

    const {name,email,password}=req.body;

    if(!email || !name || !password){
        return res.status(400).json({message:"All Fields Are Required"});
    }


    const admin=await Admin.findOne({email})

    if (admin) {

        return res.status(400).json({message:'Email Already Exist'});
        
    } else {

        const registerAdmin=await Admin.create({
            name,
            password,
            email
        });

        const Token=await createToken({
            id:registerAdmin._id,
            role:registerAdmin.role
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
const loginAdmin=async (req,res)=>{

    const {email,password}=req.body;

    try {

        if(!email || !password){

            return res.status(400).json({message:'All Fields are required'})

        }

        const admin=await Admin.findOne({email}).select('+password')

        if(!admin){
            res.status(400).json({message:'Invalid Credentials'})
        }

        const isMatch=await bcrypt.compare(password,admin.password)

        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }


        const token=await createToken({
            id:admin._id,
            role:admin.role
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
    registerAdmin,
    loginAdmin
}