"use strict";
const Pronto = require("vue-pronto");
const chalk = require('chalk');

function use(options) {
    
    const Renderer = new Pronto(options);

    function middleware(req, res, next) {

        function StreamToClient(stream) {
            stream.on("data", function(chunk) {
                return res.write(chunk);
            });
            stream.on("end", function() {
                return res.end();
            });
        }

        function StringToClient(str) {
            return res.send(str);
        }

        function ErrorToClient(err) {
            console.error(chalk.red(err));
            var temp = `
                <section style="margin:auto;width:60%;border:1px solid #eee;border-radius:10px;margin-top:10%;box-shadow:0px 0px 10px #eee;">
                    <div style="padding:60px;">
                        <h3>Oops Sempli error:</h3>
                        <hr style="border:1px solid #eee">
                        <p style="display:inline-block;"><strong>code:</strong> ${err.errno}</p>
                        <p style="display:inline-block;margin-left:20px;"><strong>type:</strong> ${err.code}</p>
                        <!--p><strong>syscall:</strong> ${err.syscall}</p-->
                        <p><strong>no such file or directory:</strong> ${err.path}</p>
                    </div>
                </section>
            `;
            res.write(temp);
            res.end();
        }

        req.vueOptions = {
            title: "",
            head: {
                scripts: [],
                styles: [],
                metas: [],
            },
        };

        res.render = function(componentPath, data = {}, vueOptions = {}) {
            res.set("Content-Type", "text/html");
            Renderer.RenderToStream(componentPath+'.vue', data, vueOptions)
                .then(StreamToClient)
                .catch(ErrorToClient);
        };

        res.renderVueString = function(componentPath, data = {}, vueOptions = {}) {
            res.set("Content-Type", "text/html");
            Renderer.RenderToString(componentPath, data, vueOptions)
                .then(StringToClient)
                .catch(ErrorToClient);
        };

        return next();
    }

    return middleware;
}

module.exports.use = use;
