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
      fs.writeFile(filename + '.styl', body, function(err) {
        if (err) {
          return console.error(chalk.red('✘ Failed: ', err));
        }
        console.log(chalk.green('✔ The file was saved!'));
      })
    })
  }

  var cwd = argv.i ? argv.i : __dirname;

  if(argv.f) {
    // convert single file

    // remove the file extension
    var noext = argv.f.replace('.scss', '').replace('.sass', '');

    // if an output directory has been specified use that, if not output to the same folder
    var output = argv.o ? argv.o : cwd;

    convertFile(cwd +'/'+ argv.f, output, noext);

  } else {
    // convert all files in directory
  }

})();
