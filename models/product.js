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

module.exports = class product {
    constructor(data) {
        this.itemName = data.itemName;
        this.itemSize = data.itemSize;
    }

    save() {

        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })

    
}

    static getProducts(cb)
{
    getProductsFromFile(cb);
}

}