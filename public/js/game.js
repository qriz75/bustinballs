// A $( document ).ready() block to start running the script immediately
$(document).ready(function() {

  /*##########  Global Variables ##########*/

  //canvas variable
  var canvas = document.querySelector('canvas');

  //setting the canvas to use up all the screen space
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //shortcut variable to reduce typing
  var c = canvas.getContext('2d');

  //the object to hold the mouse position
  var mouse = {
    mx: undefined,
    my: undefined
  }

  //the object to hold the click coordiantes
  var click = {
    cx: undefined,
    cy: undefined
  }

  // Game states
  var status = "active";
  var paused = false;
  var running = true;

  //intitial values
  var initLvl = 1;
  var initBalls = 5;
  var initPen = 1;

  // Game stats
  var level = initLvl;
  var points = 0;
  var total = 0;
  var pointSum = 0;
  var totalPoints = [];
  var totalClicks = [];
  var totalMisses = [];
  var totalBonus = [];
  var totalLvlPoints = [];
  
  var lvlPoints = 0;
  var lvlBonus = 0;
  var lvlClicks = 0;
  var lvlMisses = 0;

  //time left
  var tl = 0;

  //the point values for the balls
  var bonus = 0;
  var bp = 0;

  //total points
  var tp = 0;

  //total clicks
  var clicks = 0;
  var tc = 0;

  //timer
  var time = parseInt($('#timer').html)
  var refreshInterval = 1000;

  //sound
  var pop = new Audio('/assets/sounds/pop.mp3')
  var miss = new Audio('/assets/sounds/miss.mp3')
  var gameOverSound = new Audio('/assets/sounds/game_over.mp3')
  
  var discoArray = [
    "/assets/sounds/disco.mp3",
    "/assets/sounds/song1.mp3",
    "/assets/sounds/song2.mp3",
    "/assets/sounds/song3.mp3",
    "/assets/sounds/song4.mp3",
    "/assets/sounds/song5.mp3"    
  ]
  
  var bgrArray = [
    "/assets/img/bgr/bg1.jpg",
    "/assets/img/bgr/bg2.jpg",
    "/assets/img/bgr/bg3.jpg",
    "/assets/img/bgr/bg4.jpg",
    "/assets/img/bgr/bg5.jpg",
    "/assets/img/bgr/bg6.jpg",
    "/assets/img/bgr/bg7.jpg",
    "/assets/img/bgr/bg8.jpg",
    "/assets/img/bgr/bg9.jpg",
    "/assets/img/bgr/bg10.jpg"    
  ]
  
  var disco = new Audio(discoArray[Math.floor(Math.random() * discoArray.length)]);
  
  // how many circles at start
  var count = initBalls;
  var ballcount = 0;
  var ball;

  // an array to hold the circles
  var circleArray = [];

  //how many circles spawn on misclick
  var penCount = initPen;

  //marking the circle to be removed
  var hoveredCircle = null;

  //controlling size of the circles
  var maxRadius = 100;
  var minRadius = 10;

  //colors and points for the circles
  var colorObjArray = [{
      color: '#000000',
      points: 1
    },
    {
      color: '#FF0000',
      points: 2
    },
    {
      color: '#800000',
      points: 3
    },
    {
      color: '#FFFF00',
      points: 4
    },
    {
      color: '#808000',
      points: 5
    },
    {
      color: '#00FF00',
      points: 6
    },
    {
      color: '#008000',
      points: 7
    },
    {
      color: '#00FFFF',
      points: 8
    },
    {
      color: '#008080',
      points: 9
    },
    {
      color: '#0000FF',
      points: 10
    },
    {
      color: '#000080',
      points: 11
    },
    {
      color: '#FF00FF',
      points: 12
    },
    {
      color: '#800080',
      points: 13
    }
  ];

  /*########## Modal related ##########*/

  // Get the modal
  var nModal = document.getElementById("nextModal");

  // Get the button that closes the modal
  var nextBtn = document.getElementById("nextBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal 
  nextBtn.onclick = function() {
    //nModal.style.display = "none";
   // nModal.toggle;
  }

//   // When the user clicks on <span> (x), close the modal
//   span.onclick = function() {
//     nModal.style.display = "none";
//   }

  // When the user clicks anywhere outside of the modal, close it
//   window.onclick = function(event) {
//     if (event.target == nModal) {
//       nModal.style.display = "none";
//     }
//   }

  /*########## Eventlisteners ##########*/

  //mouse movement
  window.addEventListener('mousemove', function(event) {
    if (running == true) {
      mouse.mx = event.x;
      mouse.my = event.y;
    }

  })
  //   //window resize
  //   window.addEventListener('resize', function(event) {
  //     canvas.width = window.innerWidth;
  //     canvas.height = window.innerHeight;
  //     init();
  //   })

  //Esc key to pause
  window.addEventListener('keydown', function(e) {
    //var key = e.key;
    if (e.key === "Escape") // ESC key
    {
      togglePause();

    }
  })
  
    //m key to toggle modal only for Dev
  window.addEventListener('keydown', function(e) {
    //var key = e.key;
    if (e.key === "m") // ESC key
    {
      alert("m pressed");
        toggleModal();
     
    }
  })
  
      //t key to shave off time only for Dev
  window.addEventListener('keydown', function(e) {
    //var key = e.key;
    if (e.key === "t") // t key
    {
     
     time = 5;
       
          $(this).html(time);       
          update_time();
       
    }
  })
  
        //o key to call Game Over only for Dev
  window.addEventListener('keydown', function(e) {
    //var key = e.key;
    if (e.key === "o") // o key
    {
      forceOver();
       
    }
  })

  // mouse click
  window.addEventListener('click', function(event) {
    if (status == 'active') {
      click.cx = event.x;
      click.cy = event.y;
      clicks = clicks + 1;
      lvlClicks = lvlClicks +1;
      updateLvlClicks();
      update_monitor();

      //which circle
      if (ballcount > 1) {
        hitOrMiss();
      } else if (ballcount === 1) {
        missOrDone();
      }
    }
  })


  /*########## Functions ##########*/

  function hitOrMiss() {
    var which;
    if ((which = circleArray.indexOf(hoveredCircle)) != -1) {
      ball = which;
      hit();
    } else {
      //console.log('missed');
      missed();
    }
  }

  function missOrDone() {
    var which;
    if ((which = circleArray.indexOf(hoveredCircle)) != -1) {
      ball = which;
      hit();
      complete();
    } else {
      //console.log('missed');
      if (running == true) {
        missed();
      }
    }
  }

  function hit() {
    circleArray.splice(ball, 1);
    ballcount = ballcount - 1;
    lvlPoints = lvlPoints + (points * level);
    updateBallCt();
    updateLvlPoints();
    update_monitor()
    pop.play();

  }

  function missed() {
    if (running == true) {
      miss.play();
      penalty();


    }
  }

  //function to finish the game
  function over() {
    if (time === 0) {
      togglePause();
      clearInterval(refreshInterval);
      gameOverSound.play()
      circleArray = [];
      toggleGameOver();
      update_fpts();
      update_fbonus();
      update_flvlpts();
      update_fclicks();
      update_fpen();
      update_gtPts();
      update_gtClicks();
      update_gtBonus();
      update_gtPen();
      setTimeout(function() {
        //window.location.href = "/stats"; //will redirect to the stats page
      }, 3000); //will call the function after 3 secs.
    }
  }

    //function to finish the game by buttonpress Dev only
  function forceOver() {
      togglePause();
      clearInterval(refreshInterval);
      gameOverSound.play()
      circleArray = [];
      toggleGameOver();
      update_fpts();
      update_fbonus();
      update_flvlpts();
      update_fclicks();
      update_fpen();     
      update_gtPts();
      update_gtClicks();
      update_gtBonus();
      update_gtPen();
      setTimeout(function() {
        //window.location.href = "/stats"; //will redirect to the stats page
      }, 3000); //will call the function after 3 secs.    
  }
  
  function complete() {
    togglePause();
    clearInterval(refreshInterval);
    circleArray = [];
    disco.loop = false;
    disco.play();
    $('.discoball').removeAttr('hidden');
    $('.dance').removeAttr('hidden');
    update_tl();
    calcBonus();
    update_lbp();
    update_lc();
    update_lvl();
    update_lm();
    update_lp();
    update_pts();
    totalPoints.push(lvlPoints);
    totalClicks.push(lvlClicks);
    totalMisses.push(lvlMisses);
    var lvlTotal = lvlPoints + bonus;
    totalLvlPoints.push(lvlTotal);
    totalBonus.push(bonus);
    update_monitor()
    toggleModal();
  }
  
  function gameOver(){
    toggleGameOver();
  }

  function refreshAudio(){
    disco = new Audio(discoArray[Math.floor(Math.random() * discoArray.length)]);
  }
  
  function toggleActive() {
    if (running !== true) {
      running = true;

      update_monitor()
    } else {
      running = false;

      update_monitor();
    }
  }

  //Circle object
  function Circle(x, y, dx, dy, radius) {
    //coordinates
    this.x = x;
    this.y = y;
    //velocities
    this.dx = dx;
    this.dy = dy;
    //size
    this.radius = radius;
    //appearance
    this.fillColor = colorObjArray[Math.floor(Math.random() * colorObjArray.length)].color;
    this.strokeColor = colorObjArray[Math.floor(Math.random() * colorObjArray.length)].color;
    //value
    this.points = search(this.fillColor, colorObjArray);
    //     getPoints(this.fillColor);




    //drawing the circle
    this.draw = function() {
      //this declares that the pen starts here
      c.beginPath();
      //the actual circle calculation
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      //the outline color
      c.strokeStyle = this.strokeColor;
      //this is the function that performs the drawing
      c.stroke();
      //the filling color
      c.fillStyle = this.fillColor;
      //this function performs the filling
      c.fill();
    }
    //the update function
    this.update = function() {
      //these if statements reverse the direction when the circle hits the bordes of the canvas  
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy


      //interactivity for hovers
      // these if statements enlarge the circles to a pre-determined max size when they come in contact with the mouse
      if (mouse.mx - this.x < 50 && mouse.mx - this.x > -50 && mouse.my - this.y < 50 && mouse.my - this.y > -50) {
        hoveredCircle = this;
        if (this.radius < maxRadius) {
          this.radius += 1;
          points = this.points;
          //console.log('hover increased | ', this.x, "x", "& ", this.y, "y")
        }
      } else if (this.radius > minRadius) {
        if (hoveredCircle == this)
          hoveredCircle = null;
        this.radius -= 1;
        //console.log('mouse left decrease')
      } else if (click.cx == this.x || click.cy == this.y) {
        //this.cid = "clicked";
      }
      //calling the draw function from above
      this.draw();
    }
  }

  //the initialzation function
  function init() {
    //making sure we start with an empty arry when we call the function again
    circleArray = [];
    //looping through the array
    for (var i = 0; i < count; i++) {
      //the  variables needed to generate random circles
      var radius = 30;
      var x = Math.random() * (innerWidth - radius * 2) + radius;
      var y = Math.random() * (innerHeight - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * 10;
      var dy = (Math.random() - 0.5) * 10;
      var cid = i;
      //pushing circles into the array
      circleArray.push(new Circle(x, y, dx, dy, radius, points));
      ballcount = ballcount + 1;
      updateBallCt();
      update_monitor();
    }
  }
  //this function adds more circles to the canvas when the user mis-clicks
  function penalty() {


    //looping through the array
    for (var i = 0; i < penCount; i++) {

      //the  variables needed to generate random circles
      var radius = 30;
      var x = Math.random() * (innerWidth - radius * 2) + radius;
      var y = Math.random() * (innerHeight - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * 10;
      var dy = (Math.random() - 0.5) * 10;

      //pushing circles into the array
      circleArray.push(new Circle(x, y, dx, dy, radius));
      ballcount = ballcount + 1;
      lvlMisses = lvlMisses + 1;
      update_lm();
      updateBallCt();
      updateLevel();
      updatePom();
      update_monitor();
    }

  }



  //this function moves the circles
  function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
      //       if(circleArray[i].cid == "clicked"){
      //         circleArray.splice(i, 1);
      console.log(circleArray[i]);

      circleArray[i].update();
    }
  }

  function togglePause() {
    if (!paused) {
      paused = true;
      running = false;
      status = "inactive";
      //update_state();
      update_monitor()

    } else if (paused == true) {
      paused = false;
      running = true;
      status = 'active';
      //update_state();
      update_monitor()

    }

  }




  function search(fillColor, colorObjArray) {
    for (var i = 0; i < colorObjArray.length; i++) {
      if (colorObjArray[i].color === fillColor) {
        return colorObjArray[i].points;
      }
    }
  }





//   // Update the display - Points
//   function updatePoints() {
//     $('#points').trigger('points-changed');
//   }
//   $(document).on('points-changed', '#points', function() {
//     // do something after the div content has changed
//     $('#points').text(total.toString());
//   });
  
    // Update the display - Points
  function updateLvlPoints() {
    $('#lvlPoints').trigger('points-changed');
  }
  $(document).on('points-changed', '#lvlPoints', function() {
    // do something after the div content has changed
    $('#lvlPoints').text(lvlPoints.toString());
  });


  // Update the display - Ball Count
  function updateBallCt() {
    $('#ballct').trigger('ballct-changed');
  }
  $(document).on('ballct-changed', '#ballct', function() {
    // do something after the div content has changed
    $('#ballct').text(ballcount.toString());
  });

  // Update the display - Level
  function updateLevel() {
    $('#level').trigger('lvl-changed');
  }
  $(document).on('lvl-changed', '#level', function() {
    // do something after the div content has changed
    $('#level').text(level.toString());
  });


  // Update the display - CLicks
  function updateLvlClicks() {
    $('#lvlClicks').trigger('click-changed');
  }
  $(document).on('click-changed', '#lvlClicks', function() {
    // do something after the div content has changed
    $('#lvlClicks').text(lvlClicks.toString());
  });

  // Update the display - Penalty Spawn
  function updatePom() {
    $('#penaltyct').trigger('pom-changed');
  }
  $(document).on('pom-changed', '#penaltyct', function() {
    // do something after the div content has changed
    $('#penaltyct').text(penCount.toString());
  });

  //Update the modal  
  //Level
  function update_lvl() {
    $('#levelNum').trigger('lvlNum-changed');
  }
  $(document).on('lvlNum-changed', '#levelNum', function() {
    // do something after the div content has changed
    $('#levelNum').text(("Level " + level.toString() + " Completed"));
  });

  //Time left
  function update_tl() {
    $('#tl').trigger('tl-changed');
  }
  $(document).on('tl-changed', '#tl', function() {
    // do something after the div content has changed
    $('#tl').text((time - 1).toString());
  });

  //Bonus Points
  function update_lbp() {
    $('#lbp').trigger('lbp-changed');
  }
  $(document).on('lbp-changed', '#lbp', function() {
    // do something after the div content has changed
    $('#lbp').text(bonus.toString());
  });

  //Level Points
  function update_lp() {
    $('#lp').trigger('lp-changed');
  }
  $(document).on('lp-changed', '#lp', function() {
    // do something after the div content has changed
    $('#lp').text((lvlPoints + bonus).toString());
  });
  
    //Points
  function update_pts() {
    $('#pts').trigger('pts-changed');
  }
  $(document).on('pts-changed', '#pts', function() {
    // do something after the div content has changed
    $('#pts').text(lvlPoints.toString());
  });

  //Level Clicks
  function update_lc() {
    $('#lc').trigger('lc-changed');
  }
  $(document).on('lc-changed', '#lc', function() {
    // do something after the div content has changed
    $('#lc').text(lvlClicks.toString());
  });
  
    //Level Misses
  function update_lm() {
    $('#lm').trigger('lm-changed');
  }
  $(document).on('lm-changed', '#lm', function() {
    // do something after the div content has changed
    $('#lm').text(lvlMisses.toString());
  });


  //display GameOver Stats
      //Level Points
  function update_fpts() {
    $('#fpts').trigger('fpts-changed');
  }
  $(document).on('fpts-changed', '#fpts', function() {
    // do something after the div content has changed
    
    $.each(totalPoints, function(index, value ){
      $('#fpts').append("Level "  + (index +1) + " : " + value + '<br>');
    })   
  });
  
        //Level Bonus
  function update_fbonus() {
    $('#fbonus').trigger('fbonus-changed');
  }
  $(document).on('fbonus-changed', '#fbonus', function() {
    // do something after the div content has changed
    
    $.each(totalBonus, function(index, value ){
      $('#fbonus').append("Level "  + (index +1) + " : " + value + '<br>');
    })   
  });
  
        //Level Clicks
  function update_fclicks() {
    $('#fclicks').trigger('fclicks-changed');
  }
  $(document).on('fclicks-changed', '#fclicks', function() {
    // do something after the div content has changed
    
    $.each(totalClicks, function(index, value ){
      $('#fclicks').append("Level "  + (index +1) + " : " + value + '<br>');
    })   
  });
  
        //Level Penalty
  function update_fpen() {
    $('#fpen').trigger('fpen-changed');
  }
  $(document).on('fpen-changed', '#fpen', function() {
    // do something after the div content has changed
    
    $.each(totalMisses, function(index, value ){
      $('#fpen').append("Level "  + (index +1) + " : " + value + '<br>');
    })   
  });
  
          //Level Sum
  function update_flvlpts() {
    $('#flvlpts').trigger('flvlpts-changed');
  }
  $(document).on('flvlpts-changed', '#flvlpts', function() {
    // do something after the div content has changed
    
    $.each(totalLvlPoints, function(index, value ){
      $('#flvlpts').append("Level "  + (index +1) + " : " + value + '<br>');
    })   
  });
  
            //Total Sum
  function update_gtPts() {
    $('#gtPts').trigger('gtPts-changed');
  }
  $(document).on('gtPts-changed', '#gtPts', function() {
    // do something after the div content has changed
    let sum = 0;
    $.each(totalLvlPoints, function(index, value ){
      sum = sum + value;           
    })   
    $('#gtPts').html(sum.toString());
  });
  
              //Total Bonus
  function update_gtBonus() {
    $('#gtBonus').trigger('gtBonus-changed');
  }
  $(document).on('gtBonus-changed', '#gtBonus', function() {
    // do something after the div content has changed
    let sum = 0;
    $.each(totalBonus, function(index, value ){
      sum = sum + value;           
    })   
    $('#gtBonus').html(sum.toString());
  });
  
              //Total Clicks
  function update_gtClicks() {
    $('#gtClicks').trigger('gtClicks-changed');
  }
  $(document).on('gtClicks-changed', '#gtClicks', function() {
    // do something after the div content has changed
    let sum = 0;
    $.each(totalClicks, function(index, value ){
      sum = sum + value;           
    })   
    $('#gtClicks').html(sum.toString());
  });
  
                //Total Penalty
  function update_gtPen() {
    $('#gtPen').trigger('gtPen-changed');
  }
  $(document).on('gtPen-changed', '#gtPen', function() {
    // do something after the div content has changed
    let sum = 0;
    $.each(totalMisses, function(index, value ){
      sum = sum + value;           
    })   
    $('#gtPen').html(sum.toString());
  });
  
  // Display the Control Values ### Only in Dev Mode ###
  //Total Clicks
  function update_monitor() {
    $('#stateMon').trigger('state-changed');
  }
  $(document).on('state-changed', '#stateMon', function() {
    // do something after the div content has changed
    $('#stateMon').text("State: --> " + status.toString());
    $('#runningMon').text("Running: --> " + running.toString());
    $('#pausedMon').text("Paused: --> " + paused.toString());
    $('#levelMon').text("Level: --> " + level.toString());
    $('#countMon').text("Count: --> " + count.toString());
    $('#pointsMon').text("Points: --> " + points.toString());
    $('#ballctMon').text("Ball Count: --> " + ballcount.toString());
    $('#pomMon').text("Penalty: --> " + penCount.toString());
    $('#clicksMon').text("Clicks: --> " + clicks.toString());

  });



  function calcBonus() {
    var temp = 0;
    bonus = 0;
    for (i = 0; i < time; i++) {
      temp = i;
      bonus = temp + bonus;
      update_lbp();
    }
  }

function getReady( parent, callback ){
  
  // These are all the text we want to display
  var texts = ['Ready', 'Set', 'Go!!!'];
  
  // This will store the paragraph we are currently displaying
  var paragraph = null;
  
  // Initiate an interval, but store it in a variable so we can remove it later.
  var interval = setInterval( counting, 1000 );
  
  // This is the function we will call every 1000 ms using setInterval
  
  function counting(){

    if( paragraph ){
      
      // Remove the paragraph if there is one
      paragraph.remove();

    }

    if( texts.length === 0 ){
      
      // If we ran out of text, use the callback to get started
      // Also, remove the interval
      // Also, return since we dont want this function to run anymore.
      clearInterval( interval );
      callback();
      
      startLvl();
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

    parent.appendChild( paragraph );

  }
  
  

}

// Start a countdown by passing in the parentnode you want to use.
// Also add a callback, where you start your game.
getReady( document.getElementById("readyGo"), function(){
  
  document.getElementById("readyGo").innerHTML = '<p class="nums"></p>';
  
});
  
  function timer() {
    if (running == true)
      $('#timer').each(function() {
        time = parseInt($(this).html());
        if (time !== 0) {
          $(this).html(time - 1);
          update_time();
        } else {
          over();
        }
      });
  }

  function update_time() {
    $('#timeMon').trigger('time-changed');
  }
  $(document).on('time-changed', '#timeMon', function() {
    // do something after the div content has changed
    $('#timeMon').text("Time: --> " + time.toString());
  });

  // Schedule the update to happen once every second
  refreshInterval = setInterval(timer, 1000)

  /*########## Instruction Page ##########*/

  function popColorCode() {
    $.each(circleArray, function(index, value) {
      console.log(index + ":" + value);
    });
  }


  //Next Level
  $("#nextBtn").click(function(event) {
    event.stopPropagation();
    level = level + 1;
    updateLevel();
    time = 60;
    $('#timer').html(time);
    points = 0;
    updateLvlPoints();
    penCount = penCount * 2;
    updatePom();
    count = count * 2;
    clicks = 0;
    updateLvlClicks();
    disco.pause();
    update_monitor()
    $('.discoball').attr('hidden', true);
    $('.dance').attr('hidden', true);    
//     $('#nextModal').attr('z-index', -10);
    refreshInterval = setInterval(timer, 1000);    
//     $('#nextModal').modal('toggle');
    toggleModal();
    clearFields();
    refreshAudio();
    selectBgr();
    startLvl();

  });
  
  function clearFields(){
    lvlPoints = 0;
    updateLvlPoints();
    lvlClicks = 0;
    updateLvlClicks();
    lvlMisses = 0;
  }
  
  //Pseudo Modal 
  function toggleModal(){
    if($('#nLC').is(":hidden")){
      $('#nLC').attr('hidden', false);
    }else if($('#nLC').is(":visible")){
      $('#nLC').attr('hidden', true);
    }
  }
  
    //Pseudo Modal 
  function toggleGameOver(){
    if($('#gOC').is(":hidden")){
      $('#gOC').attr('hidden', false);
    }else if($('#gOC').is(":visible")){
      $('#gOC').attr('hidden', true);
    }
  }
  
   //Replay Level
  $("#replayBtn").click(function() {
  
  });
  
   //home buttons
  $("#homeBtn").click(function() {
    window.location = '/';
  });
    $("#homeBtn2").click(function() {
    window.location = '/';
  });
     //home button
  $("#newBtn").click(function() {
    window.location = '/game';
  });

  function selectBgr(){
    selectBG = bgrArray[Math.floor(Math.random() * bgrArray.length)];
    document.body.style.backgroundImage = 'url(' + selectBG + ')';
  }
  
  function callGetReady(){
    
    
    callFirst(getReady,function(){
             callAfter(startLvl);
             });
  }
  
  function startLvl(callback) {
    
    updatePom();       
    init();
    togglePause();
    callback();
  }


  //initialize the game
  getReady();
  togglePause();

  


  //animation call
  animate();
  //console.log('animate function');
  // End of Document Ready Function

});