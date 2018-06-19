const express = require('express');
const app = express();
const vue = require('./libViews');
const path = require('path');
const view = require('./config/views');

const vueConfig = {
    rootPath: path.join(__dirname, view.directory),
    vueVersion: view.vueVersion,
    head: view.head,
    data: view.data
};

const renderer = vue.use(vueConfig);
app.use(renderer);


app.get('/',function(req,res){
    res.render('pages/main',{data:"hola"});
});


app.listen(5001, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('server running');
    }
});

