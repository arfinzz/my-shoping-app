const Product=require('../models/product');
const Cart=require('../models/cart');


exports.displayHome=(req,res,next)=>{
    
    Product.getProducts((prods)=>{
        
    res.render('shop/home',{title:"Home Page",products:prods,path:"/"});
    });
    
}

exports.displayProducts=(req,res,next)=>{
    
    Product.getProducts((prods)=>{
        
    res.render('shop/products',{title:"Products",products:prods,path:"/products"});
    });
    
}


exports.displayProduct=(req,res,next)=>{
    const prodId=req.params.prodId;
    Product.getProductById(prodId,(prod)=>{
        console.log(prod);
        
    res.render('shop/product-details',{title:prod.name,product:prod,path:"/products"});
    });
    
}


exports.addToCart=(req,res,next)=>{
    const id=req.params.prodId;
    Product.getProducts((prods)=>{
        const prod=prods.find(pr=>id==pr.id);
        Cart.addProduct(id,prod.price);
        res.render('shop/products',{title:"Products",products:prods,path:"/products"});
    })
    
    
}

exports.addMoreToCart=(req,res,next)=>{
    const id=req.params.prodId;
    Product.getProducts((prods)=>{
        const prod=prods.find(pr=>id==pr.id);
        Cart.addProduct(id,prod.price);
        res.redirect('/cart');
    })
    
    
}


exports.deleteFromCart=(req,res,next)=>{
    const id=req.params.prodId;
    Product.getProducts((prods)=>{
        const prod=prods.find(pr=>id==pr.id);
        Cart.deleteProduct(id,prod.price);
        res.redirect('/cart');
    })
    
    
}

exports.displayCart=(req,res,next)=>{

    Cart.getCart((cart)=>{
        Product.getProducts((prods)=>{
            let cartProducts=[];
            for(let prod of prods)
            {
                let cartprod=cart.products.find(cp=>cp.id==prod.id);
                if(cartprod)
                {
                    cartProducts.push({productDetails:prod,qty:cartprod.qty});
                }
            }

            res.render('shop/cart',{title:"Cart", products:cartProducts, path:"/cart"});
            
        })
    })
}

exports.displayOrders=(req,res,next)=>{

    res.render('shop/orders',{title:"Orders",path:"/orders"});
}