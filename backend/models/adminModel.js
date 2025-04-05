const mongoose =require('mongoose')
const bycrypt=require('bcryptjs')


const adminSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Add Name']
    },
    email:{
        type:String,
        required:[true,'Add Email'],
        unique:true,
        match:[
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please Enter a valid Email"
            ]
    },
    password:{
        type:String,
        required:[true,'Please Enter Password']
    },
    isVarified:{
       type:Boolean,
       default:false
    },
    role:{
        type:String,
        default:'admin'
    }
})



adminSchema.pre('save',async function(next){
     if(!this.isModified('password')){
         next()
     }

     const salt=await bycrypt.genSalt(10)
     const hashedPassword=await bycrypt.hash(this.password,salt)
     this.password=hashedPassword
     next();
})




const Admin=mongoose.model('Admin',adminSchema);

module.exports=Admin;
