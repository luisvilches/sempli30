const fs = require('fs');
const path = require('path');

let files = fs.readdirSync(path.join(path.resolve(),'src/models'));
files.forEach(file => {
    let filename = path.basename(file,'.js');
    if(filename !== 'index'){
        exports[filename] = require(path.join(path.resolve(),'src/models',filename));
    }
});