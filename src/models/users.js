module.exports = app.createModel('User',{
    name:{type:String,required:true},
    lastName:{type:String,default:''},
    fullname:{type:String,default:''},
    email:{type:String,required:true},
    password:{type:String,required:true},
    avatar:{type:String}
});