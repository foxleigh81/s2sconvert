var request = require('request'),
    path = require('path'),
    process = require('process'),
    chalk = require('chalk'),
    argv = require('yargs').argv,
    fs = require('fs');

var formData = {
    file: fs.createReadStream(__dirname + '/example.scss')
}

var cwd = argv.p ? argv.p : __dirname;

if(argv.f) {
  // convert single file
} else {
  // convert all files in directory
}

request.post({
  url: 'http://sass2stylus.com/api',
  formData: formData
}, function (err, httpResponse, body) {
  if (err) {
    return console.error(chalk.red('✘ Failed: ', err));
  }
  fs.writeFile("example.styl", body, function(err) {
    if (err) {
      return console.error(chalk.red('✘ Failed: ', err));
    }
    console.log(chalk.green('✔ The file was saved!'));
  })
})
