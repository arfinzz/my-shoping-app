const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'cart.json');


const getCartFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb({products:[],totalPrice:0});
        }
        else {
            cb(JSON.parse(fileContent));
        }
    })
}


module.exports = class Cart {
    

    static addProduct(id,price) {

        getCartFromFile((cart)=>{

            let existingProductindex=cart.products.findIndex(prod=>id==prod.id);
            let existingProduct=cart.products[existingProductindex];
            let updatedProduct;
            if(!existingProduct)
            {
                updatedProduct={id:id,qty:1};
                cart.products.push(updatedProduct);
            }
            else
            {
                updatedProduct={...existingProduct};
                updatedProduct.qty=updatedProduct.qty+1;
                cart.products[existingProductindex]=updatedProduct;
            }
            cart.totalPrice=cart.totalPrice + + price;

            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err);
            });

        })

    
    }



    static getCart(cb){
        getCartFromFile(cb);

    }




    static deleteProduct(id,price) {

        getCartFromFile((cart)=>{

            let existingProductindex=cart.products.findIndex(prod=>id==prod.id);
            let existingProduct=cart.products[existingProductindex];
            let updatedProduct;
            if(existingProduct)
            {
                updatedProduct={...existingProduct};
                updatedProduct.qty=updatedProduct.qty-1;
                if(updatedProduct.qty>0)
                {
                    cart.products[existingProductindex]=updatedProduct;
                }
                else
                {
                    cart.products.splice(existingProductindex,1);
                }  
            }
            cart.totalPrice=cart.totalPrice - - price;

            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err);
            });

        })

    
    }

    

}