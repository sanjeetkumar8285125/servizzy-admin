const express = require('express');
const router = express.Router();
const adminModel=require('../model/Schema/adminSchema');
const bcrypt=require('bcrypt')
const authenticate=require('../middleware/auhenticate');
const checkmail=require('../middleware/checkEMail')

router.post('/register',checkmail,async(req,res)=>{
  const {name,email,password}=req.body
  try{
    if(!name || !email || !password){
       return res.status(400).json({message:"All fields are required"});
    }
    const encryptPassword=bcrypt.hashSync(password,10);
const admindata=new adminModel({
 name,email,password:encryptPassword
})
const data=await admindata.save();
res.status(201).json({message:"Admin registered Successfully",success:true,data:data})
  }catch(err){
res.status(400).json({message:"Something went wrong",success:false,err:err})
  }
})

router.post('/login',async(req,res)=>{
  try{
    const {email,password}=req.body
    if(!email || !password){
      req.flash('error_msg',"email and password cannot be blank")
    return  res.redirect('/')
      // return res.status(400).json({message:"email and password cannot be blank"});
    }
    const user=await adminModel.findOne({email:email})
    if(!user){
      req.flash('error_msg',"user not registered")
    return  res.redirect('/')
      //  res.status(400).json({message:"user not registered"})
    }
  else{
    const isMatched=bcrypt.compareSync(password,user.password)
    if(!isMatched){
      req.flash('error_msg',"Invalid Credentials")
     return res.redirect('/')
      //  res.status(400).json({message:"Invalid Credentials",success:false})
    }
    else{
      const token=await user.generateToken();
      res.cookie('jwttoken',token,{
        expires:new Date(Date.now()+ 86400000)  
      })
      // res.status(200).json({message:"admin login Successfully",success:true})
      res.redirect('/services')
    }
  }
  }catch(err){
    console.log(err)
    res.redirect('/')
// res.status(400).json({message:"Something went wrong",err:err.message})
  }
  
})

router.get('/logout',authenticate,async(req,res)=>{
try{
  req.user.tokens=req.user.tokens.filter((currElement)=>{
    return currElement.token!==req.token
  })
  res.clearCookie('jwttoken')
  await req.user.save();
  res.redirect('/')
}catch(err){
  res.status(500).send(err);
}
})


router.get('/',(req,res)=>{
  res.render('login');
})

module.exports = router;



