#!/usr/bin/env node

var request = require('request'),
    path = require('path'),
    process = require('process'),
    chalk = require('chalk'),
    argv = require('yargs').argv,
    fs = require('fs');

var s2sconvert = (function() {

  // The file converter method
  var convertFile = function(input, output, filename) {
    request.post({
      url: 'http://sass2stylus.com/api',
      formData: { file: fs.createReadStream(input) }
    }, function (err, httpResponse, body) {
      if (err) {
        return console.error(chalk.red('✘ Failed: ', err));
      }
      // Check the output directory exists and create it if not
      if (!fs.existsSync(output)){
        fs.mkdirSync(output);
      }
      fs.writeFile(output +'/'+ filename + '.styl', body, function(err) {
        if (err) {
          return console.error(chalk.red('✘ Failed: ', err));
        }
      })
    })
  }

  // if an input file has been specified, use that if not use current directory
  var cwd = argv.i ? argv.i : process.cwd();

  // if an output directory has been specified use that, if not output to the current directory
  var output = argv.o ? argv.o : cwd;

  // convert single file if 'f' flag is present, otherwise convert all files in a directory
  if(argv.f) {

    // remove the file extension
    var noext = argv.f.replace('.scss', '').replace('.sass', '');

    convertFile(cwd +'/'+ argv.f, output, noext);
    console.log(chalk.green('✔ The file was saved!'));

  } else {
    files = fs.readdirSync(cwd);
    files.forEach( function(file, index) {
      console.log(chalk.blue('currently processing ', cwd +'/'+ file, ':'));
      if (fs.statSync(cwd +'/'+ file).isDirectory()) {
        console.log(chalk.magenta(file, ' is a directory, skipping...'));
      } else if ((path.extname(file) !== '.scss') || (path.extname(file) !== '.scss'))  {
        console.log(chalk.yellow(file, ' is not a valid sass file, skipping...'));
      } else {
        // remove file extension
        var noext = path.basename(file, path.extname(file))
        convertFile(cwd +'/'+ file, output, noext);
        console.log(chalk.green('✔ '+ output + '/' + noext +'.styl has been saved!'));
      }
    })
  }

})();
