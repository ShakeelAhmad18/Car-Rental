
const mongoose = require('mongoose');

const insurancePlanSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
 },
  description:{ 
    type:String,
    required: true
  },
  daily_price: { 
    type: Number, 
    required: true 
 }

}, { 
    timestamps: true 
});


const  InsurancePlan= mongoose.model('InsurancePlan', insurancePlanSchema);
module.exports = InsurancePlan;
