const express=require('express');
const router=express.Router();
const AcServicePackModel=require('../model/Schema/AcServiceModel');
const authenticate=require('../middleware/auhenticate')
router.post('/ACService',async(req,res)=>{
    const {brandName,brandModel,fuelType}=req.body
    try{
        const data=await AcServicePackModel.find({
            "carDetails.brandName":brandName,
            "carDetails.brandModel":brandModel,
            "carDetails.fuelType":fuelType
        })
res.render('AcService',{data:data,message:"No data found in database"})
    }catch(err){
res.status(400).json({message:"Something went wrong",success:false,err:err})
    }
})

router.get('/ACService',authenticate,(req,res)=>{
    try{
     res.render('AcService',{data:'',message:''})
    }
    catch(err){
        res.status(400).json({message:"Something went wrong"})
    }
    })

router.get('/acServices/:id',authenticate,async(req,res)=>{
    try{
        const id=req.params.id
        const data=await AcServicePackModel.findById({_id:id})
        res.render('editAcServices',{data:data});
        // res.status(200).json({data:data})
    }catch(err){
        res.status(400).json({message:"Something went wrong",success:false,err:err})
    }
})


router.post('/edit',async(req,res)=>{
try{
const id=req.body.id;
console.log(id)
const desc1=req.body.desc1;
const desc2=req.body.desc2;
const time=req.body.time;
const price=req.body.price;
const data=AcServicePackModel.findByIdAndUpdate({_id:id},{
    warnOne:desc1,
    warnTwo:desc2,
    time:time,
    price:price
})
req.flash('success_msg','Ac Service Updated Successfully')
res.redirect('/ACService')
}catch(err){
    req.flash('error_msg','Something went wrong')
res.redirect('/ACService')
// res.status(400).json({messaage:"Something went wrong",err:err.messaage})
}
})


module.exports=router