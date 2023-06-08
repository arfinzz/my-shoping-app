const express=require('express');

const productsController=require('../controllers/products');




const router=express.Router();



router.post('/add-product',productsController.postAddProduct)

router.get('/add-product',productsController.getAddProduct)

module.exports=router;