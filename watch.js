const serverWatch = require('semplice-watch');
const chalk = require('chalk');

serverWatch({
  script: 'index.js',
  ext: 'js json vue css'
});

serverWatch.on('quit', function () {
  console.log(chalk.red('App has quit'));
  process.exit();
}).on('restart', function (files) {
  console.log(chalk.cyan('Change -> ', files));
});