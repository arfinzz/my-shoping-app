const Product=require('../models/product');

exports.postAddProduct=(req,res,next)=>{
    const title=req.body.title;
    const price=req.body.price;
    const quantity=req.body.quantity;
    const description=req.body.description;
    const imageurl=req.body.imageurl;
    req.user.createProduct({
        title:title,
        price:price,
        quantity:quantity,
        description:description,
        imageurl:imageurl
    })
    .then((result)=>{
        res.render('admin/add-product',{title:"Add Product",path:"/admin/add-product"});
    })
    .catch(err=>{
        console.log(err);
    });
   
};


exports.getAddProduct=(req,res,next)=>{
    res.render('admin/add-product',{title:"Add Product",path:"/admin/add-product"});
};



exports.displayProducts=(req,res,next)=>{

    req.user.getProducts()
    .then((products)=>{
        //console.log(products);
        res.render('admin/products',{title:"Admin Products",products:products,path:"/admin/products"});
    })
    .catch(err=>{
        console.log(err);
    });
   
};


exports.deleteProduct=(req,res,next)=>{
    const idToDelete=req.params.prodId;

    req.user.getProducts({
        where:{
            id: idToDelete
        }
    })
    .then((result)=>{
        result[0].destroy();
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    }); 
};


exports.getEditProduct=(req,res,next)=>{
    const idToEdit=req.params.prodId;

    Product.findAll({
        where:{
            id:idToEdit
        }
    })
    .then((product)=>{
        res.render('admin/edit-product',{title:"Edit Product",prod:product[0],path:"/admin/products"});
    })
    .catch();
};

exports.postEditProduct=(req,res,next)=>{
    const idToEdit=req.params.prodId;

    Product.update({
     title:req.body.title,
     price:req.body.price,
     quantity:req.body.quantity,
     description:req.body.description,
     imageurl:req.body.imageurl,
    },{
        where:{
            id:idToEdit
        }
    })
    .then((result)=>{
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    });
};
