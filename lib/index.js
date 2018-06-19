const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require(path.join(path.resolve(),'config'));
const chalk = require('chalk');
const Render = require('./middlewares/render');
const body = require('connect-multiparty')();

module.exports = class Sempli {
    constructor(){
        this.config = config;
        this.views = this.config.views;
        this.server = this.config.application;
        this.auth = this.config.auth;
        this.fs = this.config.filesystem;
        this.mail = this.config.mail;
        this.database = this.config.database;
        this.express = express();
        this.routeApp = path.resolve();
        this.vueConfig = {
            rootPath: path.join(this.routeApp,this.views.directory),
            vueVersion: this.views.vueVersion,
            head: this.views.head,
            data: this.views.data
        };

        this.initial();
    }

    initial(){
        const renderer = Render.use(this.vueConfig);
        this.setUse(renderer);

        this.serverStart();
    }

    serverStart(){
        return this.express.listen(this.server.port,err => {
            if(err){
                console.log(chalk.red('Error ->',err));
            } else {
                console.log(chalk.cyan('Log -> Server running in port', this.server.port));
            }
        });
    }

    renderViews(views){
        return this.express.response.app.render(this.resolvePath('src/views/'+views));
    }

    resolvePath(to){
        return path.join(this.routeApp,to);
    }

    setUse(middleware){
        return this.express.use(middleware);
    }

    getControllers(){
        return require(path.join(path.resolve(),'app/import_controllers'));
    }

    getModels(){
        return require(path.join(path.resolve(),'app/import_models'));
    }

    getMiddlewares(){
        return require(path.join(path.resolve(),'app/import_middlewares'));
    }

    Router(){
        return express.Router();
    }

    publicRoutes(route){
       return this.express.use('/',body,require(path.join(path.resolve(),'src/routes',route)));
    }

    privateRoutes(directory,route){
       return this.express.use(directory,body,require(path.join(path.resolve(),'src/routes',route)));
    }

    storage(obj,name,folder){
        let date = new Date();
        let versions = date.getDate() + date.getSeconds() + date.getMilliseconds();
        let new_name = name + '_' + versions; 
        let routeFile = obj.path;
        let getFolder = folder ? folder : "";
        let new_route = path.join(path.resolve(),this.application.folder_public, getFolder,new_name + path.extname(routeFile));
        let file = new_name + path.extname(routeFile).toLowerCase();
        fs.createReadtream(routeFile).pipe(fs.createWriteStream(new_route));
        return file;
    }

    randomColor(){
        let colors = [
            'DC143C',
            '8B0000',
            'C71585',
            'FF1493',
            'FF4500',
            '8A2BE2',
            '8B008B',
            '4B0082',
            '483D8B',
            '2E8B57',
            '008080',
            '191970',
            '800000',
            '000000'
        ];

        function random(){
            return Math.floor(Math.random() * (colors.length - 0)) + 0;
        }

        return colors[random()];
    }

    replaceAll(){
        return String.prototype.replaceAll = function(search,replacement){
            var target = this;
            return target.replace(new RegExp(search,'g'),replacement);
        }
    }

}