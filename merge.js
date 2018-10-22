const fs = require('fs');

function stopAndError( t ){
    console.error( t );
    process.exit();
}

function readFile(){
    const default_filename = 'automergejs.json'
    let filename = default_filename;
    let ob = null;
    if( typeof process.argv[2] !== 'undefined' ){
        filename = process.argv[2];
    }
    console.log( 'Reading Filename: ' + filename );
    try{
        ob = JSON.parse(fs.readFileSync( filename , 'utf8'));
    }catch (e) {
        stopAndError('Filename ' + filename + ' does not exist. The default filename is ' + default_filename);
    }
    return ob;
}

function readFileContent( path ){
    const encoding = 'utf8';
    console.log( ' - > Reading File: ' + path );
    const r = fs.readFileSync( path, encoding );
    return r;
}

function writeFile( path , content ){
    fs.writeFile( path , content, function(err) {
        if(err) {
            stopAndError(err);
        }
        console.log(' -> File saved: ' + path);
    });
}

function analyzeItem( item ){
    // console.log( 'Reading item', item );
    let content = '';
    if( item.type === 'file' ){
        console.log( ' -> Registry type: file ');
        content = readFileContent( item.path ) + '\n\n';
    }
    return content;
}

function processSingleRule( r ) {
    console.log( 'Preparing files for output to: ' + r.output );
    let final_file = '';
    for( let j = 0 ; j < r.files.length; j++ ){
        const f = r.files[j];
        final_file += analyzeItem( f );
    }
    writeFile( r.output, final_file );
}

function processRules(){
    /**
     * PER EACH AUTOMERGE ITEM
     */
    const obj = readFile();

    for( let i = 0; i < obj.length; i++ ){
        const r = obj[i];
        processSingleRule( r );
    }
}

processRules();
