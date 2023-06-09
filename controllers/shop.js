const Product=require('../models/product');
const Cart=require('../models/cart');


exports.displayHome=(req,res,next)=>{
    
    Product.getProducts()
    .then(([products])=>{
        res.render('shop/home',{title:"Home Page",products:products,path:"/"});
    })
    .catch(err=>{
        console.log(err);
    })
    
}

exports.displayProducts=(req,res,next)=>{
    
    Product.getProducts()
    .then(([products])=>{
        res.render('shop/products',{title:"Products",products:products,path:"/products"});
    })
    .catch(err=>{
        console.log(err);
    })
    
}


exports.displayProduct=(req,res,next)=>{
    const prodId=req.params.prodId;
    Product.getProductById(prodId)
    .then(([product])=>{
       //console.log(product[0].name)
        res.render('shop/product-details',{title:product.name,product:product[0],path:"/products"});
    })
    .catch(err=>{
        console.log(err);
    })
    
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