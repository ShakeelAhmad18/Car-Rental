const Owner = require("../models/onwerModel");
const { fileSizeFormatter } = require("../utils/fileUploads");
const couldinary=require('cloudinary').v2


const addOnwer = async (req, res) => {

    const { firstName,lastName, phone, identityNumber,state,city, address} = req.body;

    try {
     
       

        let fileData={};

       if(req.file){
        //save image to cloudinary
        let uploadFile;
        
        try {
          uploadFile=await couldinary.uploader.upload(req.file.path,{
              folder:"Rental",resource_type:'image'
          })
          
        } catch (error) {
          res.status(500)
          throw new Error('Images could not be uploaded')
        }
          fileData = {
              fileName:req.file.originalname,
              filePath:uploadFile.secure_url,
              fileType:req.file.type,
              fileSize: fileSizeFormatter(req.file.size,2)
          }
      }
      
         

        const newOnwer =await Owner.create({
            firstName,
            lastName,
            phone,
            identityNumber,
            state,
            city,
            address,
            image:Object.keys(fileData).length === 0 ? 'there is error' : fileData
        });
       


        res.json({message:"onwer added successfully"});

        
    } catch (error) {

        res.status(500).json({ error: error.message });
        
    }

}

const allOnwer = async (req, res) => {

    try {
        const onwers = await Owner.find();
        res.json(onwers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports = { addOnwer, allOnwer };