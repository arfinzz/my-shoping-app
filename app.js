const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');

const sequelize=require('./utils/database');
const rootDir=require('./utils/path');
const Product=require('./models/product');
const User=require('./models/user');
const Cart=require('./models/cart');
const CartItem=require('./models/cart-item');


const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const errorController=require('./controllers/error');





const app=express();

app.set('view engine','ejs');


app.use(express.static(path.join(rootDir,'public')));
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next)=>{
    User.findByPk(1)
    .then((user)=>{
        req.user=user;
        next();
    })
    .catch((err)=>{
        console.log(err);
    });
})


app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(errorController.errorPage);



Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product , {through:CartItem});
Product.belongsToMany(Cart , {through:CartItem});


//{force:true}
sequelize.sync()
.then((result)=>{
    return User.findByPk(1);
})
.then((user)=>{
    if(!user)
    {
       return User.create({email:'abc@gmail.com'});
    }
    return user;
})
// .then((user)=>{
//     return user.createCart();
//  })
.then(()=>{
    console.log('listning')
    app.listen(3300);
})
.catch((err)=>{
    console.log(err);
})
