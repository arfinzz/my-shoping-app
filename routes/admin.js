const express=require('express');

const adminController=require('../controllers/admin');





const router=express.Router();



router.post('/add-product',adminController.postAddProduct)

router.get('/add-product',adminController.getAddProduct)
router.get('/products',adminController.displayProducts)

router.post('/editProduct/:prodId',adminController.postEditProduct)

router.get('/editProduct/:prodId',adminController.getEditProduct)
router.get('/deleteProduct/:prodId',adminController.deleteProduct)





module.exports=router;