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
    fs.writeFileSync( path , content, function(err) {
        if(err) {
            stopAndError(err);
        }
        console.log(' -> File saved: ' + path);
    });
}

function readFolderFiles( path, pattern ){
    console.log( 'Reading Files of folder: ' + path , ' | ' + pattern );
    let content = '';
    // console.log( 'Preparing to read' );
    let files = [];
    try{
        files = fs.readdirSync(path);
    }catch (e) {
        console.log( 'Error reading the folder: ' + path );
        process.exit();
    }

    // console.log( files );

    files.forEach(file => {
        const regex = new RegExp( pattern, 'gi' );
        // console.log('File Regex' , file ,  regex );
        const r = file.match( regex );
        if( r !== null ){
            console.log( '  ===>   ' +  path + '/' + file + ' | ' + pattern);
            const read = readFileContent( path + '/' + file );
            // console.log( read );
            content += read;

        }
        // console.log( regex, r );
    });

    /*fs.readdirSync(path, (err, files) => {
        files.forEach(file => {
            console.log('File Regex' , file ,  regex );
            const regex = new RegExp( pattern, 'gi' );
            const r = file.match( regex );
            if( r !== null ){
                console.log( '  ===>   ' +  path + '/' + file + ' | ' + pattern);
                const read = readFileContent( path + '/' + file );
                console.log( read );
                content += read;

            }
            // console.log( regex, r );
        });
    });*/
    return content;
}


function analyzeItem( item ){
    // console.log( 'Reading item', item );
    let content = '';
    console.log( ' -> Registry type: ' + item.type);
    if( item.type === 'file' ){
        content = readFileContent( item.path ) + '\n\n';
    }
    if( item.type === 'folder' ){
        content = readFolderFiles( item.path, item.pattern ) + '\n\n';
        // content = readFileContent( item.path ) + '\n\n';
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
