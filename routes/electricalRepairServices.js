const express=require('express');
const router=express.Router();
const ElectricityServiceModel=require('../model/Schema/ElectricityServicePack');
const authenticate=require('../middleware/auhenticate')
router.post('/ElectricalService',async(req,res)=>{
    const {brandName,brandModel,fuelType}=req.body
    try{
        const data=await ElectricityServiceModel.find({
            "carDetails.brandName":brandName,
            "carDetails.brandModel":brandModel,
            "carDetails.fuelType":fuelType
        })
res.render('electricalRepairServices',{data:data,message:"No data found in database"})
    }catch(err){
res.status(400).json({message:"Something went wrong",success:false,err:err})
    }
})

router.get('/ElectricalService',authenticate,(req,res)=>{
    try{
     res.render('electricalRepairServices',{data:'',message:''})
    }
    catch(err){
        res.status(400).json({message:"Something went wrong"})
    }
    })

router.get('/ElectricalService/:id',authenticate,async(req,res)=>{
    try{
        const id=req.params.id
        const data=await ElectricityServiceModel.findById({_id:id})
        res.render('editelectricalRepairServices',{data:data});
        // res.status(200).json({data:data})
    }catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err})
    }
})


router.post('/ElectricalService/edit',async(req,res)=>{
try{
const id=req.body.id;
const desc1=req.body.desc1;
const desc2=req.body.desc2;
const time=req.body.time;
const price=req.body.price;
const data=await ElectricityServiceModel.findByIdAndUpdate(id,{
    warnOne:desc1,
    warnTwo:desc2,
    time:time,
    price:price
})
req.flash('success_msg','Electrical Service Updated Successfully')
res.redirect('/ElectricalService')
}catch(err){
    req.flash('error_msg','Something went wrong')
res.redirect('/ElectricalService')
// res.status(400).json({messaage:"Something went wrong",err:err.messaage})
}
})


module.exports=router