module.exports = {
    get:function(req,res){
        res.render('main',{
            name:"Semplice",
            slogan:"Framework FullStack"
        });
    }
}