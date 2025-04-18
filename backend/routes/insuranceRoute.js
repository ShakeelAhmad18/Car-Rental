const express = require("express");

const { Insurance, updateInsurance, deleteInsurance, getInsuranceById, getAllInsurancePlans } = require("../controllers/insuranceController");

const router = express.Router();


router.post('/addInsurance',Insurance);
router.put('/updateInsurance/:id',updateInsurance);
router.delete('/deleteInsurance/:id', deleteInsurance);
router.get('/getInsurance/:id', getInsuranceById);
router.get('/getAllInsurance',getAllInsurancePlans);


module.exports = router;