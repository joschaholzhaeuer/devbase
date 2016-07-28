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

    var todos   = ["Internet kündigen", "Geschenk kaufen", "Joachim anrufen"],
        $list   = $(".todo-list"),
        $button = $(".todo-list-button");

    // Display each todo
    var displayTodos = function() {

        $.each( todos, function( i, val ) {
            $list.append("<li class='sites-item sites-link todo-list-item' data-name='" + val + "'>" + val + "</li>");
        });

        var $item = $(".todo-list-item");
        return $item;
    };

    var $item = displayTodos();

    // Add items on button click
    $(document).on( 'click', $button, function(e) {
        e.preventDefault();

        var todo = $(".todo-list-input").val();

        // Check if input is not empty
        if ( todo != "" && todo != " " ) {

            // Add to do to array
            todos.push(todo);

            // Add to file
            // TO DO

            // Show new to do in list
            $list.append("<li class='sites-item sites-link todo-list-item'>" + todo + "</li>");

            // Clear input field
            $(".todo-list-input").val("");
        }
    });

    // Remove items on check
    $(document).on( 'click', $item, function(a) {

        var selectedItem = $(a.target).attr("data-name"),
            todosNew      = todos,
            index         = todosNew.indexOf(selectedItem);

        // Remove from Array
        if (index > -1) {
            todosNew.splice(index, 1);
        }

        // Remove from file
        // TO DO

        // Update list
        $list.children(".todo-list-item").remove();
        displayTodos();
    });


}); // end document.ready