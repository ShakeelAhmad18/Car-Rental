
const express=require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { createBooking, getAllBookings, getBookingByUser, getBookingById, updateBookingStatus, deleteBooking, getBookingDatesByCarId } = require('../controllers/bookingController');

const router=express.Router();



router.post('/createBooking',authMiddleware,createBooking);
router.get('/getAllbookings',getAllBookings);
router.get('/getBookingByUser',authMiddleware,getBookingByUser);
router.get('/getBookingById/:id',getBookingById); 
router.patch('/updateBooking/:id',updateBookingStatus);
router.delete('/deleteBooking/:id',deleteBooking);
router.get('/getBookingDatesByCarId/:id',getBookingDatesByCarId);

module.exports=router;
