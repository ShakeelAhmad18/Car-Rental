const InsurancePlan = require('../models/insurancePlanModel');


const Insurance = async (req, res) => {

  const { name, description, daily_price } = req.body;

 

  try {

    if(!name || !description || !daily_price) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    const insurance = new InsurancePlan({
      name,
      description,
      daily_price
    });
    await insurance.save();
    res.status(201).json({message:'Insurance Plan Added Sucessfully',insurance});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}


//update insurance plan
const updateInsurance=async (req, res) => {
  try {
    const insurance = await InsurancePlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(insurance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}


//delete insurance plan

const deleteInsurance = async (req, res) => {
    try {
    await InsurancePlan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Insurance plan deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Get all insurance plans

const getAllInsurancePlans = async (req, res) => {
    try {
    const plans = await InsurancePlan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get insurance plan by ID

const getInsuranceById = async (req, res) => {
  try {
    const plan = await InsurancePlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Insurance plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}




module.exports = {
  Insurance,
  updateInsurance,
  deleteInsurance,
  getAllInsurancePlans,
  getInsuranceById
}