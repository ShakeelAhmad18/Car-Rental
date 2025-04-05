const { mongoose } = require("mongoose");

const ownerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    identityNumber: {
        type: String,
        required: true,
        unique: true,
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    image:{
        type: Object,
        default:{}
   },
   status:{
       type:String,
       default:"active"
   },
});


const Owner= mongoose.model('Owner', ownerSchema);
module.exports = Owner;