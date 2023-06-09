const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        else {
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product {
    constructor(name,quantity,price,imageUrl,description) {
        this.name=name;
        this.quantity=quantity;
        this.price=price;
        this.imageUrl=imageUrl;
        this.description=description;
    }

    save() {
        this.id=Math.random().toString();

        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })

    
        }

    static getProducts(cb){
    getProductsFromFile(cb);
    }


    static getProductById(id,cb){
        getProductsFromFile((prods)=>{
           const res=prods.find((prod)=>prod.id==id);
          cb(res);
        })
    }


    static deleteProductById(id,cb){
        getProductsFromFile((prods)=>{
          const indexToRemove=prods.findIndex((prod)=>prod.id==id);
          //console.log(indexToRemove);
          if(indexToRemove>-1)
          {
            prods.splice(indexToRemove,1);
          }
          fs.writeFile(p, JSON.stringify(prods), (err) => {
            console.log(err);
            cb();
        })

        })
    }


    static editProductById(id,newProd,cb){
        getProductsFromFile((prods)=>{
            const indexToEdit=prods.findIndex((prod)=>prod.id==id);
           if(indexToEdit>-1)
           {
            prods[indexToEdit]={...newProd,id:id};
           }
           //console.log(prods);
           fs.writeFile(p, JSON.stringify(prods), (err) => {
            console.log(err);
            cb();
        })

        })
    }

}