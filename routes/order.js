const express=require('express');
const router=express.Router();
const orderModel=require('../model/Schema/orderModel')
const ChallanAndInsuranceModel = require('../model/Schema/ChallanAndInsuranceModel');
const ServiceModel = require("../model/Schema/ServiceModel");
const authenticate=require('../middleware/auhenticate')
const upload=require('../utils/multer');
const cloudinary=require('../utils/cloudinary')
const fs=require('fs');

let fileHandler = function (err) {
    if (err) {
      console.log("unlink failed", err);
    }
  };

router.get('/user/view/:id',authenticate,async(req,res)=>{
    const id=req.params.id;
    try{
        const data=await orderModel.find({userId:id},null,{sort:{'createdAt':-1}});
         res.render('viewOrder',{data:data,role:req.user.role})
        //res.status(200).json({data:data})
    }catch(err){
        res.status(400).json({message:"Something went Wrong",err:err})
    }

})

router.get('/user/user-alerts/:id',authenticate,async(req,res)=>{
    const id=req.params.id;
    try{
        const data=await ChallanAndInsuranceModel.find({userId:id}).sort({'_id':-1});
         res.render('viewAlerts',{data:data,role:req.user.role})
        //res.status(200).json({data:data})
    }catch(err){
        res.status(400).json({message:"Something went Wrong",err:err})
    }

})

router.get('/user/user-cars/:id',authenticate,async(req,res)=>{
    const id=req.params.id;
    try{
        const data=await ServiceModel.find({userId:id}).sort({'_id':-1});
         res.render('viewCars',{data:data})
        //res.status(200).json({data:data})
    }catch(err){
        res.status(400).json({message:"Something went Wrong",err:err})
    }

})

router.get('/onGoingOrder',authenticate,async(req,res)=>{
    try{
const data=await orderModel.find({orderStatus:'false'},null,{sort:{'createdAt':-1}})
res.render('ongoingOrder',{data:data,role:req.user.role})
//res.status(200).json({data:data})
    }catch(err){
        res.status(200).json({message:"Something went wrong",err:err})
    }
})
router.get('/completedOrder',authenticate,async(req,res)=>{
    try{
const data=await orderModel.find({orderStatus:'true'},null,{sort:{'updatedAt':-1}})
res.render('completedOrder',{data:data,role:req.user.role})
//res.status(200).json({data:data})
    }catch(err){
        res.status(200).json({message:"Something went wrong",err:err})
    }
})



router.get('/admin/order/:id',authenticate,(req,res)=>{
    const orderid=req.params.id;
    try{
res.render('editAdminOrder',{data:orderid,role:req.user.role})
    }catch(err){
res.status(400).json({message:"Something Went Wrong",err:err,success:false})
    }
})

router.post('/admin/order/status',authenticate,upload.single('invoicePdf'),async(req,res)=>{
    try{
const {orderid,serviceDate,serviceType,invoiceAmount,odometerReading,dealerName}=req.body;
const result=await cloudinary.uploader.upload(req.file.path)
const data=await orderModel.updateOne({_id:orderid},{
serviceDate,
serviceType,
invoiceAmount,
odometerReading,
dealerName,
orderStatus:"true",
invoicePDF:result.secure_url,
cloudinary_id:result.public_id
})
fs.unlink(req.file.path,fileHandler)
req.flash('success_msg',"Order Data Submitted Successfully")
res.redirect('/ongoingOrder')
    }catch(err){
        req.flash('error_msg',"Something went wrong")
res.redirect('/ongoingOrder')
        // res.status(400).json({message:"Something Went Wrong",err:err,success:false})
    }
})
module.exports=router