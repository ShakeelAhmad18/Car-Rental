const jwt=require('jsonwebtoken');

module.exports.authMiddleware=async (req,res,next)=>{

    const {accessToken}=req.cookies;

     

    if(!accessToken){

        return res.status(409).json({message:"Unauthenticated"});
        
    }else{

    try {

        const deCodeToken=jwt.verify(accessToken,process.env.JWT_SECRET);
        req.role=deCodeToken.role;
        req.id=deCodeToken.id;
       next();
        
    } catch (error) {
        return res.status(409).json({message:"Unauthenticated"});
    }
}

}

