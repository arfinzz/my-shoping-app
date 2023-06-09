const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');

const db=require('./utils/database');


const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const errorController=require('./controllers/error');

const rootDir=require('./utils/path');



const app=express();

app.set('view engine','ejs');

app.use(express.static(path.join(rootDir,'public')));
app.use(bodyParser.urlencoded({extended:true}));


app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.errorPage);
app.listen(3300);