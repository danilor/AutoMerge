# AutoMerge Tool

This tool was made using NodeJS technology.

## Usage

Just run
 
    node mergejs [RULES FILENAME: Optional] 
    
This will read the rules file and execute the process.

## Rules File

You can pass as a parameter the name of the rules files you want to use. If the 
parameter is missing, it will use the default "automergejs.json" file. If the file does not 
exist, then the tool will throw an error.

The rules file has the following structure

    -   Array of rules
        -   Each Rule
            -   output: The output file for this rules
            -   files: array of files we want to merge (the order is the one of the array)
                -   path: the path of the file
                -   type: the type of the file. Right now it supports "file" and "folder"
                
                
### Example file

    [
      {
        "output": "assets/bundle/bundle.js",
        "files": [
    
          {
            "path":"assets/vendor/jquery/3.3.1/jquery.js",
            "type":"file"
          },
          {
            "path":"assets/vendor/turnjs4/lib/turn.js",
            "type":"file"
          },
          {
            "path":"assets/js/resposive_turnjs.js",
            "type":"file"
          },
          {
            "path":"assets/js/script.js",
            "type":"file"
          },
          {
            "path":"assets/js/start.js",
            "type":"file"
          }
        ]
      },
      {
        "output": "assets/bundle/bundle.css",
        "files": [
    
          {
            "path":"assets/css/style.css",
            "type":"file"
          }
        ]
      }
    ]
