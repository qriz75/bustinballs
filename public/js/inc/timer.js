$(document).ready(function() {
  var time = parseInt($('#timer').html)
  var gameOver = new Audio('/assets/sounds/game_over.mp3')
  var refreshInterval = 1000;


  // Function to update counters on all elements with class counter
  var doUpdate = function() {
    $('#timer').each(function() {
      time = parseInt($(this).html());
      if (time !== 0) {
        $(this).html(time - 1);
      } else {
        over();
        clearInterval(refreshInterval);
      }
    });
  };

  // Schedule the update to happen once every second
   refreshInterval = setInterval(doUpdate, 1000)

  function over() {
    if (time === 0) {
      gameOver.play()
      
      setTimeout(function() {
        window.location.href = "/stats"; //will redirect to the stats page
      }, 3000); //will call the function after 3 secs.
    }
  }



});