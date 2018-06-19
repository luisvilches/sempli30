const models = app.getModels();

exports.create = (req,res) => {
    let user = new models.users({
        name:req.body.name,
        lastName:req.body.lastname,
        fullname:req.body.fullname,
        email:req.body.email,
        password:req.body.password,
        avatar: 'https://ui-avatars.com/api/?size=1024&background='+app.randomColor()+'&color=fff&name='+req.body.name.charAt(0)+'+'+req.body.lastName.charAt(0)
    });

    user.save((err,response) => {
        if(err){
            res.status(500).json({status:false,err:err});
        } else {
            res.status(200).json({status:true,data:response});
        }
    })
}

exports.users = (req,res) => {
    models.users.find({},(err,response) => {
        if(err){
            res.status(500).json({status:false,err:err});
        } else {
            res.status(200).json({status:true,data:response});
        }
    })
}

