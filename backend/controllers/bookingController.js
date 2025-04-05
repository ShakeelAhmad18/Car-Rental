const Booking = require("../models/bookingModel");

const createBooking = async (req, res) => {
    const {car,returnDate,pickupDate,pickupLocation,returnLocation,totalPrice,driverRequired,notes}=req.body;

    try {

        if(!car || !pickupDate || !returnDate || !pickupLocation || !returnLocation || !totalPrice){
            return res.status(400).json({message:'All Fields are required'})
        }

        const booking=await Booking.create({
            user:req.id,
            car,
            pickupDate,
            returnDate,
            pickupLocation,
            returnLocation,
            totalPrice,
            driverRequired,
            notes
        })

        res.status(201).json({message:'Booking Created Successfully',booking});
        
    } catch (error) {

        res.status(500).json({message:error.message});
        
    }
}   




const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user', 'name email').populate('car', 'model brand year price').sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get booking by user

const getBookingByUser = async (req, res) => {
    
    try {
        const bookings = await Booking.find({ user: req.id }).populate('car', 'model brand year price').sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//get booking by id

const getBookingById = async (req, res) => {

    try {
        const booking = await Booking.findById(req.params.id).populate('user car');
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

//update status

const updateBookingStatus = async (req, res) => {
    try {
        const { status, paymentStatus } = req.body;
        const booking = await Booking.findByIdAndUpdate(req.params.id, { status, paymentStatus, updatedAt: Date.now() }, { new: true });

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.status(200).json({ success: true, message: "Booking updated successfully", booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Delete a booking
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({ success: true, message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get booking pickupDate and returnDate by car ID
const getBookingDatesByCarId = async (req, res) => {
    try {
        const { carId } = req.params;
        const bookings = await Booking.find({ car: carId }).select('pickupDate returnDate');

        if (!bookings.length) {
            return res.status(404).json([]);
        }

        res.status(200).json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



module.exports={
    createBooking,
    getAllBookings,
    getBookingByUser,
    getBookingById,
    updateBookingStatus,
    deleteBooking,
    getBookingDatesByCarId
}