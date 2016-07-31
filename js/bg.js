/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */

var storeItems = function() {

    var todosItems = new Array();

    chrome.storage.set({'todosArray': todosItems}, function() {
        console.log("yep, stored");
    });
}

storeItems();

alert("Hello");