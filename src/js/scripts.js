/******************************************************************
JAVASCRIPT: MAIN

    > FUNCTIONS
        > EASY_LOG

    > DOCUMENT_READY

******************************************************************/


/******************************************************************
EASY_LOG

    A shorter version of console.log();
    USAGE: log(vars);

******************************************************************/

function log(
    vars // variables and other stuff you want to output in the console
) {
    console.log(vars);
}



/******************************************************************
DOCUMENT_READY
******************************************************************/

$(document).ready(function() {

    log('Hallo Du');

}); // end document.ready