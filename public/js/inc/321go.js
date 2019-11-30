$(document).ready(function() {

  // These are all the text we want to display
  var texts = ['three', 'two', 'one'];

  // This will store the paragraph we are currently displaying
  var paragraph = null;

  // Initiate an interval, but store it in a variable so we can remove it later.
  var interval = setInterval(counting, 1000);


  function countdown(parent, callback) {

    // This is the function we will call every 1000 ms using setInterval

    function counting() {

      if (paragraph) {

        // Remove the paragraph if there is one
        paragraph.remove();

      }

      if (texts.length === 0) {

        // If we ran out of text, use the callback to get started
        // Also, remove the interval
        // Also, return since we dont want this function to run anymore.
        clearInterval(interval);
        callback();
        return;

      }

      // Get the first item of the array out of the array.
      // Your array is now one item shorter.
      var text = texts.shift();

      // Create a paragraph to add to the DOM
      // This new paragraph will trigger an animation
      paragraph = document.createElement("p");
      paragraph.textContent = text;
      paragraph.className = text + " nums";

      parent.appendChild(paragraph);

    }


  }

  // Start a countdown by passing in the parentnode you want to use.
  // Also add a callback, where you start your game.
  countdown(document.getElementById("readyGo"), function() {

    document.getElementById("readyGo").innerHTML = '<p class="nums">start</p>';

  });

});