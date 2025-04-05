const express=require('express');
const { addOnwer, allOnwer } = require('../controllers/onwerController');
const { upload } = require('../utils/fileUploads');
const router=express.Router();


router.post('/add-onwer',upload.single('image'),addOnwer);
router.get('/get-onwers',allOnwer);


module.exports=router;