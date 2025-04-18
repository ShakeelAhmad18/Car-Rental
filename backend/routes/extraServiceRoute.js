
const express=require('express');
const { AddExtraService, getAllExtraServices, getExtraServiceById, updateExtraService, deleteExtraService } = require('../controllers/extraServiceController');

const router=express.Router();

router.post('/addextraService',AddExtraService)
router.get('/getextraService',getAllExtraServices)
router.get('/getextraService/:id',getExtraServiceById)
router.put('/updateextraService/:id',updateExtraService)
router.delete('/deleteextraService/:id',deleteExtraService)


module.exports=router;

