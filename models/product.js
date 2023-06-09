const db=require('../utils/database');


module.exports = class Product {
    constructor(name,quantity,price,imageUrl,description) {
        this.name=name;
        this.quantity=quantity;
        this.price=price;
        this.imageUrl=imageUrl;
        this.description=description;
    }

    save(){
        return db.execute('INSERT INTO products (name,price,quantity,description,imageUrl) VALUES (?,?,?,?,?)',
        [this.name,this.price,this.quantity,this.description,this.imageUrl]);
    }

    static getProducts(){
        return db.execute('SELECT * FROM products');
    }


    static getProductById(id){
        return db.execute('SELECT * FROM products WHERE products.id=?',[id]);
    }


    static deleteProductById(id){
       return db.execute('DELETE FROM products WHERE products.id=?',[id]);
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