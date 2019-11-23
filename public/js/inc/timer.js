$(document).ready(function() {

  // Function to update counters on all elements with class counter
  var doUpdate = function() {
    $('#timer').each(function() {
      var time = parseInt($(this).html());
      if (time !== 0) {
        $(this).html(time - 1);
      }
    });
  };

  // Schedule the update to happen once every second
  setInterval(doUpdate, 1000);
});