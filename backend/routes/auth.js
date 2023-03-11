const express=require('express');
const router=express.Router();
const {body, validationResult} = require('express-validator'); 
const User=require('../models/User');
const bcrypt =require("bcryptjs");
var jwt=require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')
const JWT_SECRET='Onlymyproject';

//create a user using:POST "/api/auth/";
// router.post('/',(req,res)=>{
router.post('/',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5}),
    
], async (req,res)=>{
    let success=false;
    // obj = {
    //     a:'y_so',
    //     number:34
    // }
    // res.json(obj)
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        success=false;
        return res.status(400).json({success,error:errors.array()});
    }

    try {

    
    let user=await User.findOne({email:req.body.email});
    if(user){
        success=false;
        return res.status(400).json({success,errors:"user with email already exists"})
    }

    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);

    user=await User.create({//create a new user
        name:req.body.name,
        email:req.body.email,
        //password:req.body.password 
        password:secPass
    })//.then(user=> res.json(User));
    // console.log(req.body);
    // const user= User(req.body);
    // user.save()
    //  res.send(req.body);

    const data={
        user:{
            id:user.id
        }
    }
    const authtoken=jwt.sign(data,JWT_SECRET)
    // console.log(authtoken);
    success=true;
    //res.json(user);
    res.json({success,authtoken}); 


    }catch(error){
        console.error(error.message);
        res.status(500).send("some error occured");

    }
})

//rout:2
router.post('/login',[
    //body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5}),
    
], async (req,res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    const {email,password}=req.body;
    try {
        let user= await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({success,error:"try another login"})
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success,error:"try correct password"})
        }

        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET)
        // console.log(jwtData);
        success=true;
        res.json({success,authtoken});

    }catch(error){
        console.error(error.message);
        res.status(500).send("internal some error occured");
    }
})


//rout:3
router.post('/fetch',fetchuser ,async (req,res)=>{//middleware
try{
    userid = req.user.id;
    const user=await User.findById(userid).select("-password")
    res.send(user);
}catch (error){
    console.error(error.message);
    res.status(500).send("internal something error");
}
});
module.exports = router