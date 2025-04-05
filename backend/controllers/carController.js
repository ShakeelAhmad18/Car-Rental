const Car = require("../models/carModel");
const { fileSizeFormatter } = require("../utils/fileUploads");
const cloudinary = require("cloudinary").v2;
const path = require("path");

// 🆕 Add a new car
const addCar = async (req, res) => {
    const { 
        name, brand, rentPerkm, model, color, fuelType, AC, doors, seats, driveTrain, 
        VIN, Engine, mileage, category, transmission, owner, description, 
        street, city, country, lat, lng 
    } = req.body;

    try {
        let fileData = {};

        if (req.file) {
            try {
                const filePath = path.normalize(req.file.path).replace(/\\/g, '/');
                const uploadFile = await cloudinary.uploader.upload(filePath, {
                    folder: "Car Rental",
                    resource_type: "image"
                });

                fileData = {
                    fileName: req.file.originalname,
                    filePath: uploadFile.secure_url,
                    fileType: req.file.mimetype,
                    fileSize: fileSizeFormatter(req.file.size, 2)
                };

            } catch (error) {
                console.error("Cloudinary Upload Error:", error);
                return res.status(500).json({ error: "Image upload failed" });
            }
        }

        const newCar = await Car.create({
            name, brand, rentPerkm, model, color, fuelType, AC, doors, seats, driveTrain, 
            VIN, Engine, mileage, category, transmission, owner, description,
            image: fileData?.filePath || "Image upload failed",
            address: { street, city, country, lat, lng }
        });

        res.status(201).json({ message: "Car added successfully", car: newCar });

    } catch (error) {
        console.error("Car Creation Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// 🆕 Get all cars
const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find().sort({ createdAt: -1 }).populate("owner", "firstName phone");
        res.status(200).json(cars);
    } catch (error) {
        console.error("Get All Cars Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// 🆕 Get car by ID
const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({ message: "Car Not Found" });
        }

        res.status(200).json(car);
    } catch (error) {
        console.error("Get Car by ID Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// 🆕 Update a car
const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            name, brand, rentPerkm, model, color, fuelType, AC, doors, seats, driveTrain, 
            VIN, Engine, mileage, category, transmission, owner, description, 
            street, city, country, lat, lng 
        } = req.body;

        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({ message: "Car Not Found" });
        }

        let fileData = {};

        if (req.file) {
            try {
                const filePath = path.normalize(req.file.path).replace(/\\/g, '/');
                const uploadFile = await cloudinary.uploader.upload(filePath, {
                    folder: "Car Rental",
                    resource_type: "image"
                });

                fileData = {
                    fileName: req.file.originalname,
                    filePath: uploadFile.secure_url,
                    fileType: req.file.mimetype,
                    fileSize: fileSizeFormatter(req.file.size, 2)
                };

            } catch (error) {
                console.error("Cloudinary Upload Error:", error);
                return res.status(500).json({ error: "Image upload failed" });
            }
        }

        const updateData = {
            name, brand, rentPerkm, model, color, fuelType, AC, doors, seats, driveTrain, 
            VIN, Engine, mileage, category, transmission, owner, description,
            address: { street, city, country, lat, lng }
        };

        if (Object.keys(fileData).length !== 0) {
            updateData.image = fileData.filePath; // Add image only if uploaded
        }

        const updatedCar = await Car.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ message: "Car updated successfully", car: updatedCar });

    } catch (error) {
        console.error("Update Car Error:", error);
        res.status(500).json({ error: error.message });
    }
};


// 🆕 Delete a car
const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({ message: "Car Not Found" });
        }

        // Remove from Cloudinary (if image exists)
        if (car.image) {
            const publicId = car.image.split('/').pop().split('.')[0]; // Extract Cloudinary public ID
            await cloudinary.uploader.destroy(`Car Rental/${publicId}`);
        }

        await Car.findByIdAndDelete(id);

        res.status(200).json({ message: "Car deleted successfully" });

    } catch (error) {
        console.error("Delete Car Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// 🆕 Add a review to a car
const addReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, rating, comment } = req.body;

        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({ message: "Car Not Found" });
        }

        const newReview = { user, rating, comment, createdAt: new Date() };

        car.reviews.push(newReview);
        await car.save();

        res.status(200).json({ message: "Review added successfully", car });

    } catch (error) {
        console.error("Add Review Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// Export controllers
module.exports = {
    addCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar,
    addReview
};
