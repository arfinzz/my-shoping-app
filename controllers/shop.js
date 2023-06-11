const Product=require('../models/product');
const Cart=require('../models/cart');


exports.displayHome=(req,res,next)=>{
    
    req.user.getProducts()
    .then((products)=>{
        //console.log(products);
        res.render('shop/home',{title:"Home",products:products,path:"/"});
    })
    .catch(err=>{
        console.log(err);
    });
    
}

exports.displayProducts=(req,res,next)=>{
    
    req.user.getProducts()
    .then((products)=>{
        //console.log(products);
        res.render('shop/home',{title:"Home",products:products,path:"/products"});
    })
    .catch(err=>{
        console.log(err);
    });
    
}


exports.displayProduct=(req,res,next)=>{
    const prodId=req.params.prodId;
    req.user.getProducts({where:{
        id:prodId
    }})
    .then((products)=>{
       //console.log(product[0].name)
        res.render('shop/product-details',{title:products[0].title,product:products[0],path:"/products"});
    })
    .catch(err=>{
        console.log(err);
    })
    
}


exports.addToCart=(req,res,next)=>{
    const id=req.params.prodId;
    let fetchedCart;
    let newQuantity=1;

    req.user.getCart()
    .then((cart)=>{
        fetchedCart=cart;
       return cart.getProducts({where:{
            id:id
        }})
    })
    .then(products=>{
        let product;
        if(products.length>0)
        {
            product=products[0];
        }
        if(product)
        {
            let oldQuantity=product.cartItem.quantity;
            newQuantity+=oldQuantity;

           
        }
        return Product.findByPk(id);
    })
    .then(product=>{
           return fetchedCart.addProduct(product,{through:{quantity:newQuantity}});
    })
    .then(()=>{
        res.redirect('/products');
    })
    .catch(err=>{
        console.log(err);
    })

    
    
}

exports.addMoreToCart=(req,res,next)=>{
    const id=req.params.prodId;
    let fetchedCart;
    let newQuantity=1;

    req.user.getCart()
    .then((cart)=>{
        fetchedCart=cart;
       return cart.getProducts({where:{
            id:id
        }})
    })
    .then(products=>{
        let product;
        if(products.length>0)
        {
            product=products[0];
        }
        if(product)
        {
            let oldQuantity=product.cartItem.quantity;
            newQuantity+=oldQuantity;

           
        }
        return Product.findByPk(id);
    })
    .then(product=>{
           return fetchedCart.addProduct(product,{through:{quantity:newQuantity}});
    })
    .then(()=>{
        res.redirect('/cart');
    })
    .catch(err=>{
        console.log(err);
    })
    
    
}


exports.deleteFromCart=(req,res,next)=>{
    const id=req.params.prodId;

    req.user.getCart()
    .then(cart=>{
       return cart.getProducts({where:{
            id:id
        }})
    })
    .then(products=>{
        let product=products[0];
        return product.cartItem.destroy();
    })
    .then(()=>{
        res.redirect('/cart');
    })
    .catch(err=>{
        console.log(err);
    })
    
}

exports.displayCart=(req,res,next)=>{

    req.user.getCart()
    .then(cart=>{
        return cart.getProducts();
    })
    .then((products)=>{
        //console.log(products);
        res.render('shop/cart',{title:"Cart", products:products, path:"/cart"});
    })

    // Cart.getCart((cart)=>{
    //     Product.getProducts((prods)=>{
    //         let cartProducts=[];
    //         for(let prod of prods)
    //         {
    //             let cartprod=cart.products.find(cp=>cp.id==prod.id);
    //             if(cartprod)
    //             {
    //                 cartProducts.push({productDetails:prod,qty:cartprod.qty});
    //             }
    //         }

    //         res.render('shop/cart',{title:"Cart", products:cartProducts, path:"/cart"});
            
    //     })
    // })
}

exports.displayOrders=(req,res,next)=>{

    res.render('shop/orders',{title:"Orders",path:"/orders"});
}