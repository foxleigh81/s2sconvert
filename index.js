#!/usr/bin/env node

var request = require('request'),
    path = require('path'),
    process = require('process'),
    mkdirp = require('mkdirp'),
    inquirer = require('inquirer-promise'),
    chalk = require('chalk'),
    argv = require('yargs').argv,
    fs = require('fs');

var s2sconvert = (function() {
  // Display intro message
  console.log(chalk.magenta.bold.underline('Sass 2 Stylus CLI converter. V1.00 by Alex Ward.', "\n"));
  console.log(chalk.bgYellow.white.bold(' Notice ') + chalk.yellow(' This package currently requires an internet connection to function')+"\r\n");
  console.log('type \'s2sconvert -h\' for instructions.', "\r\n");
  if (argv.h) {
    // TODO: Add help info
    console.log(chalk.white('Sorry, help not implemented yet. :trollface:'));
    process.exit(1);
  }
  // The file converter method
  var convertFile = function(input, output, filename) {
    request.post({
      url: 'http://sass2stylus.com/api',
      formData: { file: fs.createReadStream(input) }
    }, function (err, httpResponse, body) {
      if (err) {
        return console.error(chalk.red('✘ Operation failed: ', err));
      }

      var directory = path.dirname(input).split('/');

      if (directory.length > 1) {
        directory = directory.pop();
      } else {
        directory = null;
      }

      // Check the output directory exists and create it if not
      if (!fs.existsSync(output)) {
        console.log(chalk.magenta(output, 'not found, creating new directory...'))
        mkdirp(output);
      } else {
        console.log(chalk.cyan( output, 'found, copying into existing directory'))
      }

      //Also check that each subdirectory exists, if not create one.
      if(directory) {
        if (!fs.existsSync(output + '/' + directory)) {
          console.log(chalk.magenta(output + '/' + directory, ' not found, creating new directory...'))
          mkdirp(output + '/' + directory);
        } else {
          console.log(chalk.cyan(output + '/' + directory, 'found, copying into existing directory'))
        }
        fs.writeFile(output + '/' + directory +'/'+ filename + '.styl', body, function(err) {
          if (err) {
            return console.error(chalk.red('✘ Operation failed: ', err));
          }
        })
      } else {
        fs.writeFile(output + '/' + filename + '.styl', body, function(err) {
          if (err) {
            return console.error(chalk.red('✘ Operation failed: '), err);
          }
        })
      }



    })
  }

  // Generate a file list from a directory tree
  var directory_spider = function(dir, file_list) {
    console.log(chalk.yellow('Generating file list from ', dir, '...'));
    var files = fs.readdirSync(dir);
    file_list = file_list || [];

    files.forEach( function(file) {
      if (fs.statSync(dir + '/' + file).isDirectory()) {
        file_list = directory_spider(dir + '/' + file, file_list);
       }
       else {
         if ((path.extname(dir + '/' + file) !== '.scss') || (path.extname(dir + '/' + file) !== '.scss'))  {
           console.log(chalk.cyan(file, ' is not a valid sass file, skipping...'));
         } else {
           file_list.push(dir + '/' + file);
         }
       }
    });

    return file_list
  }

  // Loop through file list and process suitable files.
  var file_processor = function(cwd) {
    var file_list = directory_spider(cwd, file_list);
    for (var i = 0; i < file_list.length; i++) {
      var file = file_list[i];
      console.log(chalk.blue('» currently processing ', file , ':'));
      var noext = path.basename(file, path.extname(file)); // remove file extension
      convertFile(file, output, noext);
      console.log(chalk.green('✔ ', output, '/', noext, '.styl has been saved!'));
    }
  };

  // if an input file has been specified, use that if not use current directory
  var cwd = argv.i ? argv.i : process.cwd();

  // if an output directory has been specified use that, if not output to the current directory
  var output = argv.o ? argv.o : cwd;

  // convert single file if 'f' flag is present, otherwise convert all files in a directory
  if(argv.s) {
    // remove the file extension
    var noext = argv.s.replace('.scss', '').replace('.sass', '');
    convertFile(cwd +'/'+ argv.s, output, noext);
    console.log(chalk.green('✔ conversion complete!'));
  } else {
    // allow user to disable prompting (useful for task runners)
    if(!argv.f) {
      // As this is an operation on a directory, show the directory this will
      // run in and confirm the user wishes to continue
      inquirer.confirm( chalk.bgRed.white.bold(' WARNING!: ') + chalk.red(' This will convert ' + chalk.underline.bold('ALL') + ' Sass and SCSS files in ' + chalk.white.underline(cwd) + ' and ' + chalk.underline.bold('ALL') + ' subdirectories.') + "\n" + chalk.white(' Please type \'y\' if you wish to continue:'), { default: false } )
      .then( function(answers) {
        if (answers === true) {
          file_processor(cwd);
        } else {
          console.log(chalk.yellow('Conversion cancelled by user.'));
        }
      });
    } else {
      file_processor(cwd);
    }
  }
})();
