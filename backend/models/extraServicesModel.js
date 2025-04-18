
const mongoose = require('mongoose');

const extraServiceSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
   },
  description: {
    type: String,
    required: true
  },
  daily_price: { 
    type: Number, 
    required: true 
  }
}, { 
    timestamps: true 
});


 const ExtraService =mongoose.model('ExtraService', extraServiceSchema);
 module.exports = ExtraService;
 
 