const express=require('express');
const router=express.Router();
const insuranceModel=require('../model/Schema/InsurenceServiceModel');
const authenticate=require('../middleware/auhenticate')

router.post('/insuranceService',async(req,res)=>{
    const {brandName,brandModel,fuelType}=req.body
    try{
        const data=await insuranceModel.find({
            "carDetails.brandName":brandName,
            "carDetails.brandModel":brandModel,
            "carDetails.fuelType":fuelType
        })
res.render('insuranceService',{data:data,message:"No data found in database"})
    }catch(err){
res.status(400).json({message:"Something went wrong",success:false,err:err})
    }
})

router.get('/insuranceService',authenticate,(req,res)=>{
    try{
     res.render('insuranceService',{data:'',message:''})
    }
    catch(err){
        res.status(400).json({message:"Something went wrong"})
    }
    })

router.get('/insuranceService/:id',authenticate,async(req,res)=>{
    try{
        const id=req.params.id
        const data=await insuranceModel.findById({_id:id})
        res.render('editinsuranceService',{data:data});
        // res.status(200).json({data:data})
    }catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err})
    }
})


router.post('/insuranceService/edit',async(req,res)=>{
try{
const id=req.body.id;
const desc1=req.body.desc1;
const desc2=req.body.desc2;
const time=req.body.time;
const price=req.body.price;
const data=await insuranceModel.findByIdAndUpdate(id,{
    warnOne:desc1,
    warnTwo:desc2,
    time:time,
    price:price
})
req.flash('success_msg',"Insurance Service Updated Successfully")
res.redirect('/insuranceService')
}catch(err){
    req.flash('error_msg',"Something went wrong on updating Service")
res.redirect('/insuranceService')
// res.status(400).json({messaage:"Something went wrong",err:err.messaage})
}
})


module.exports=router