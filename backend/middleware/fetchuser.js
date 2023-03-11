var jwt=require('jsonwebtoken');
const JWT_SECRET='Onlymyproject';


const fetchuser = (req,res,next)=>{
    //get user from jwttoken and id to req object
    const token=req.header("auth-token");
    if(!token){
        res.status(401).send({error:"please authenticate using valid token"})
    }

    try{
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next()
    }catch{
        res.status(401).send({error:"please authenticate using valid token"})
    }
}

module.exports = fetchuser