const express=require('express');
const router=express.Router();
const authenticate=require('../middleware/auhenticate');
router.get('/services',authenticate,(req,res)=>{
    res.render('services')
})
module.exports=router;