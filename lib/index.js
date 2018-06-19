const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require(path.join(path.resolve(),'config'));
const chalk = require('chalk');
const Render = require('./middlewares/render');
const body = require('connect-multiparty')();
const mongoose = require('mongoose');

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
        require('dotenv').config();
        const renderer = Render.use(this.vueConfig);
        this.setUse(renderer);
        this.dbonnect(this.dbStr());
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

    dbStr(){
        var str; 
        if(process.env['DB']){
            switch(process.env['DB_DRIVER']){
                case 'mongodb':
                    str = `mongodb://${process.env['DB_USER']}:${process.env['DB_PASS']}@${process.env['BD_HOST']}:${process.env['DB_PORT']}/${process.env['DB_NAME']}}`;
                    break;
            }
        } else {
            switch(this.database['DB_DRIVER']){
                case 'mongodb':
                    str = `mongodb://${this.database['DB_USER']}:${this.database['DB_PASS']}@${this.database['DB_HOST']}:${this.database['DB_PORT']}/${this.database['DB_NAME']}}`;
                    break;
            }
        }

        return {driver:process.env['DB'] ? process.env['DB_DRIVER'] : this.database['DB_DRIVER'],str:str};
    }

    dbonnect(db){
        switch(db.driver){
            case 'mongodb':
                mongoose.connect(db.str, err => {
                    if(err){
                        console.log(chalk.red('Error ->',err));
                    } else {
                        console.log(chalk.green('Success -> connect db', process.env['DB_NAME'] ? process.env['DB_NAME'] : this.database['DB_NAME']));
                    }
                });
                break;
        }
    }

    generateTokens(){

    }

}