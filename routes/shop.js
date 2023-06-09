const express=require('express');

const shopController=require('../controllers/shop');


const router=express.Router();

router.get('/',shopController.displayHome);
router.get('/products',shopController.displayProducts);
router.get('/cart',shopController.displayCart);
router.get('/orders',shopController.displayOrders);

router.get('/addtocart/:prodId',shopController.addToCart);
router.get('/addMoreToCart/:prodId',shopController.addMoreToCart);
router.get('/deleteFromCart/:prodId',shopController.deleteFromCart);
router.get('/productdetails/:prodId',shopController.displayProduct);

module.exports=router;