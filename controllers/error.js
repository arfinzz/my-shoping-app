exports.errorPage=(req,res,next)=>{
    res.render('404',{title:"Error page",path:"none"});
}