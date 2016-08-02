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

var log = function (
    vars // variables and other stuff you want to output in the console
) {
    console.log(vars);
};


// Get all to do list items and return them
var getTodos = function() {

    var $todoItems = $(".todo-list-item");
    return $todoItems;
};




/******************************************************************
DOCUMENT_READY
******************************************************************/

$(document).ready(function() {

    var $list   = $(".todo-list"),
        $button = $(".todo-list-button"),
        $allTodoItems;


    // Store new items in array
    var storeList = function(a) {
        chrome.storage.local.set({'reminder': a});
    };


    // On load of the new tab, check if there are any items previously stored
    chrome.storage.local.get('reminder', function (items) {

        var todosPrev;

        // There are already to do's saved in the chrome.storage
        if ( items.reminder ) {
            todosPrev = items.reminder;

            displayTodos(todosPrev);

            $allTodoItems = getTodos();

        // There is no to do so far, this is the first one and has to be saved to chrome.storage
        } else {
            todosPrev = [];

            storeList(todosPrev);

            $allTodoItems = getTodos();
        }
    });


    // Display each todo
    var displayTodos = function(todos) {

        $.each( todos, function( i, val ) {
            $list.append("<li class='sites-item sites-link todo-list-item' data-name='" + val + "'>" + val + "</li>");
        });
    };


    // Add items on button click
    $(document).on( 'click', $button, function() {

        // Add to do to array and save to storage
        chrome.storage.local.get('reminder', function (items) {

            var todo,
                todos;

            // There are already to do's saved in the chrome.storage
            if ( items.reminder ) {

                todo = $(".todo-list-input").val();
                todos = items.reminder;

                // Check if input is not empty
                if ( todo !== "" && todo !== " " ) {

                    todos.push(todo);
                    storeList(todos);

                    // Show new to do in list
                    $list.append("<li class='sites-item sites-link todo-list-item' data-name='" + todo + "'>" + todo + "</li>");

                    // Clear input field
                    $(".todo-list-input").val("");

                    $allTodoItems = getTodos();
                }

            // There is no to do so far, this is the first one and has to be saved to chrome.storage
            } else {

                todo = $(".todo-list-input").val();
                todos = [todo];

                // Check if input is not empty
                if ( todo !== "" && todo !== " " ) {

                    storeList(todos);

                    // Show new to do in list
                    $list.append("<li class='sites-item sites-link todo-list-item' data-name='" + todo + "'>" + todo + "</li>");

                    // Clear input field
                    $(".todo-list-input").val("");

                    $allTodoItems = getTodos();
                }
            }
        });
    });


    // Remove items on check
    $(document).on( 'click', $allTodoItems, function(a) {

        // Get array from chrome.storage
        chrome.storage.local.get('reminder', function (items) {

            // There are already to do's saved in the chrome.storage
            if ( items.reminder ) {
                var todos        = items.reminder,
                    $deletedItem = $(a.target),
                    selectedItem = $(a.target).attr("data-name"),
                    index        = todos.indexOf(selectedItem);

                // Remove from Array
                if (index > -1) {
                    todos.splice(index, 1);

                    // Save to Chrome storage
                    storeList(todos);

                    // Update list
                    $list.children($deletedItem).remove();
                    displayTodos(todos);
                }
            }
        });
    });


}); // end document.ready