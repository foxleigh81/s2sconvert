# s2sconvert
A node based tool which uses Mojotechs excellent [sass2stylus](https://github.com/mojotech/sass2stylus) api to batch convert all sass files to stylus files in a folder using the command line.

## Installation

As this is a node package, Installation is easy! Just type `npm install s2sconvert`, if you want to use it globally I suggest adding the '-g' flag.

## Usage

### Batch file (default)
s2sconvert uses the command line to batch convert all files in the current working directory by default, so simply go to the directory containing your files and type:

`s2sconvert`

### Single file
If you only want to convert a single file then that's possible too, again go to the working directory and type:

`s2sconvert -s 'filename.sass'`

Longform argument: --single

### Specify source(input) directory
You can also specify an input directory if you want to use the tool from within something like gulp or grunt (or if you just can't be bothered to cd into the correct folder ):

`s2sconvert -i '/path/to/files'`


Longform argument: --in

### Specify output directory
By default s2sconvert just outputs the files in the current directory, if you want to specify an output directory, use the following:

`s2sconvert -o '/path/to/directory'`

Longform argument: --out

### Delete originals
If you want to delete the source files automatically once they have been converted add the '-d' flag:

`s2sconvert -d`

Longform argument: --delete

### Bypass all prompts (force)

You can force the conversion without having to answer any prompts by using the -f flag.

`s2sconvert -f`

Longform argument: --force

Warning: The prompts are there to prevent you from accidentally converting files in the wrong directory, as this tool converts subdirectories as well, it could convert every sass file on your computer if used in the wrong place (your root directory for example). Use this at your own risk.

### Show help

Show the help, pretty self-explanatory really.

`s2sconvert -h`

Longform argument: --help

Warning: The prompts are there to prevent you from accidentally converting files in the wrong directory, as this tool converts subdirectories as well, it could convert every sass file on your computer if used in the wrong place (your root directory for example). Use this at your own risk.

## Roadmap

- Remove dependency on sass2stylus api as this currently requires an internet connection to perform the conversion
- Create a gulp wrapper
- Add some unit tests to ensure future releases are robust
