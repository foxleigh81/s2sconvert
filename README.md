# sass2stylus
A node based tool which uses Mojotechs excellent [sass2stylus](https://github.com/mojotech/sass2stylus) api to batch convert all sass files to stylus files in a folder using the command line.

# UNDER CONSTRUCTION!

If you found this repo, ignore everything below this point as it's currently still being built and literally none of this works yet. I usually write documentation before the app so I can use it as a plan.

## Installation

As this is a node package, Installation is easy! Just type `npm install sass2stylus`, if you want to use it globally I suggest adding the '-g' flag.

## Usage

### Batch file (default)
sass2stylus-cli uses the command line to batch convert all files in the current working directory by default, so simply go to the directory containing your files and type:

`s2sconvert`

### Single file
If you only want to convert a single file then that's possible too, again go to the working directory and type:

`s2sconvert -f 'filename.sass'`

### Specify source directory
You can also specify a directory if you want to use the tool from within something like gulp or grunt (or if you just can't be bothered to cd into the correct folder):

`s2sconvert -i '/path/to/files'`

### Specify output directory
By default sass2stylus-cli just outputs the files in the existing directory, if you want to specify an output directory, use the following:

`s2sconvert -o '/path/to/directory'`

### Delete originals
If you want to delete the source files automatically once they have been converted add the '-d' flag:

`s2sconvert -d`


## Requirements

### OS X / MacOS

You need to be on at least OS X 10.8 and have xcode 4.5 or higher installed.

### Windows

You need to have the [visual x++ 2013 runtime library](https://www.microsoft.com/en-us/download/details.aspx?id=40784) (or higher) installed.

Warning: This has been known to not work under the Windows environment. There may be a possible fix for this issue [here](http://docs.nwjs.io/en/latest/For%20Users/Advanced/Use%20Native%20Node%20Modules/)

### Linux

You must install whichever libcurl development package is suitable for your distro installed (if you are on ubuntu/debian then `libcurl4-openssl-dev` or higher will do the job).
