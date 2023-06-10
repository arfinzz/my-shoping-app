const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');

const sequelize=require('./utils/database');
const rootDir=require('./utils/path');


const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const errorController=require('./controllers/error');





const app=express();

app.set('view engine','ejs');


app.use(express.static(path.join(rootDir,'public')));
app.use(bodyParser.urlencoded({extended:true}));


app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(errorController.errorPage);

sequelize.sync()
.then((result)=>{
    app.listen(3300);
})
.catch((err)=>{
    console.log(err);
})
