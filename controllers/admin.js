
const Product=require('../models/product');

exports.postAddProduct=(req,res,next)=>{
    const prod=new Product(req.body.name,req.body.quantity,req.body.price,req.body.imageUrl,req.body.description);
    prod.save();
    res.render('admin/add-product',{title:"Add Product",path:"/admin/add-product"});
}

exports.getAddProduct=(req,res,next)=>{
    res.render('admin/add-product',{title:"Add Product",path:"/admin/add-product"});
}



exports.displayProducts=(req,res,next)=>{
    
    Product.getProducts((prods)=>{
        
    res.render('admin/products',{title:"Admin Products",products:prods,path:"/admin/products"});
    });
    
}


exports.deleteProduct=(req,res,next)=>{
    const idToDelete=req.params.prodId;

    Product.deleteProductById(idToDelete,()=>{
        Product.getProducts((prods)=>{
        
            res.render('admin/products',{title:"Admin Products",products:prods,path:"/admin/products"});
            });

    })
    
    
    
}


exports.getEditProduct=(req,res,next)=>{
    const idToEdit=req.params.prodId;
    Product.getProductById(idToEdit,(prod)=>{
        res.render('admin/edit-product',{title:"Edit Product",prod:prod,path:"/admin/products"});
    })
    

}

exports.postEditProduct=(req,res,next)=>{
    const idToEdit=req.params.prodId;
   Product.editProductById(idToEdit,req.body,()=>{

    Product.getProducts((prods)=>{
        
        res.render('admin/products',{title:"Admin Products",products:prods,path:"/admin/products"});
        });
   });
    

}
