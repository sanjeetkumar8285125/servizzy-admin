const express=require('express');
const router=express.Router();
const orderModel=require('../model/Schema/orderModel')
const authenticate=require('../middleware/auhenticate')
router.get('/user/view/:id',authenticate,async(req,res)=>{
    const id=req.params.id;
    try{
        const data=await orderModel.find({userId:id},null,{sort:{'createdAt':-1}});
         res.render('viewOrder',{data:data})
        //res.status(200).json({data:data})
    }catch(err){
        res.status(400).json({message:"Something went Wrong",err:err})
    }

})

router.get('/onGoingOrder',authenticate,async(req,res)=>{
    try{
const data=await orderModel.find({orderStatus:'false'},null,{sort:{'createdAt':-1}})
res.render('ongoingOrder',{data:data})
//res.status(200).json({data:data})
    }catch(err){
        res.status(200).json({message:"Something went wrong",err:err})
    }
})
router.get('/completedOrder',authenticate,async(req,res)=>{
    try{
const data=await orderModel.find({orderStatus:'true'},null,{sort:{'createdAt':-1}})
res.render('completedOrder',{data:data})
//res.status(200).json({data:data})
    }catch(err){
        res.status(200).json({message:"Something went wrong",err:err})
    }
})

router.post('/admin/order/status',authenticate,(req,res)=>{
    
orderModel.updateOne({_id:req.body.orderId},{orderStatus:req.body.status},(err,data)=>{
    if(err){
        req.flash('error_msg','Something went wrong')
        res.redirect('/ongoingOrder')
    }
    else{
        res.redirect('/ongoingOrder')
    }
})

})
module.exports=router