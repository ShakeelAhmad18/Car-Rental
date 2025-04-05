
const express=require('express');
const { addCar, getAllCars, getCarById, updateCar } = require('../controllers/carController');
const { upload } = require('../utils/fileUploads');



const router=express.Router();

router.post('/addCar',upload.single('image'), addCar);
router.get('/getCars',getAllCars);
router.patch('/updatecar/:id',upload.single('image'),updateCar);
router.get('/getCarbyid/:id',getCarById)

module.exports=router;

