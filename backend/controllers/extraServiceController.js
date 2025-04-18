
const ExtraService = require("../models/extraServicesModel");


//add extra service
const AddExtraService =  async (req, res) => {

  const { name, description, daily_price } = req.body;

  if (!name || !description || !daily_price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const service = new ExtraService({
      name,
      description,
      daily_price
    });
    await service.save();
    res.status(201).json({ message: 'Extra service added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


//update extra service

const updateExtraService = async (req, res) => {
  try {
    const service = await ExtraService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


//delete extra service

const deleteExtraService = async (req, res) => {
  try {
    await ExtraService.findByIdAndDelete(req.params.id);
    res.json({ message: 'Extra service deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


// Get all extra services
const getAllExtraServices =  async (req, res) => {
  try {
    const services = await ExtraService.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get extra service by ID

const getExtraServiceById = async (req, res) => {
  try {
    const service = await ExtraService.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = {
  AddExtraService,
  updateExtraService,
  deleteExtraService,
  getAllExtraServices,
  getExtraServiceById
};