module.exports = {
    get:function(req,res){
        res.render('pages/main',{data:"hola"});
    }
}