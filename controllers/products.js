
const Product=require('../models/product');

exports.postAddProduct=(req,res,next)=>{
    const prod=new Product(req.body);
    prod.save();
    res.render('add-product',{title:"Add Product",path:"/admin/add-product"});
}

exports.getAddProduct=(req,res,next)=>{
    res.render('add-product',{title:"Add Product",path:"/admin/add-product"});
}

exports.displayProducts=(req,res,next)=>{
    
    Product.getProducts((prods)=>{
        
    res.render('home',{title:"Home Page",products:prods,path:"/"});
    });
    
}
