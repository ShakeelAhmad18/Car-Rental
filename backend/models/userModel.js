const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match:[
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please Enter a valid Email"
            ]
    },
    password: {
        type: String,
        required: true,
    },
    isVarified: {
        type: Boolean,
        default: false,
    },
    role:{
        type:String,
        default:'user',
    },
}, 
{ 
    timestamps: true 
}
);


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    
            // Hash the password before saving the user model
            // Generate a salt and hash the password
    const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(this.password,salt)
        this.password=hashedPassword
        next();
});


const User=mongoose.model('User', userSchema);
module.exports = User;