// A $( document ).ready() block.
$(document).ready(function() {
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
  // global variables 

  // Game states 
  var state = ['paused', 'over', 'active']
  var paused = false;
  var over = false;
  // how many circles
  var count = 10;
  //sound
  var pop = new Audio('/assets/sounds/pop.mp3')
  var miss = new Audio('/assets/sounds/miss.mp3')
  var game_over = new Audio('/assets/sounds/game_over.mp3')
  var level = 1;
  var ballcount = 0;
  // an array to hold the circles
  var circleArray = [];

  //how many circles spawn on misclick
  var penCount = 5;
  //marking the circle to be removed
  var hoveredCircle = null;
  //the point value for the circle
  var points = 0;
  var total = 0;
  //controlling size of the circles
  var maxRadius = 100;
  var minRadius = 10;
  //a palette of colors for the circles
//   var colorArray = [
//     '#000000',
//     '#FF0000',
//     '#800000',
//     '#FFFF00',
//     '#808000',
//     '#00FF00',
//     '#008000',
//     '#00FFFF',
//     '#008080',
//     '#0000FF',
//     '#000080',
//     '#FF00FF',
//     '#800080'
//   ];

//     var colorPoints = {
//      '#000000': 1,
//      '#FF0000': 2,
//      '#800000': 3,
//      '#FFFF00': 4,
//      '#808000': 5,
//      '#00FF00': 6,
//      '#008000': 7,
//      '#00FFFF': 8,
//      '#008080': 9,
//      '#0000FF': 10,
//      '#000080': 11,
//      '#FF00FF': 12,
//      '#800080': 13
//     };
  
  var colorObjArray = [{color: '#000000', points: 1},
                       {color: '#FF0000', points: 2},
                       {color: '#800000', points: 3},
                       {color: '#FFFF00', points: 4},
                       {color: '#808000', points: 5},
                       {color: '#00FF00', points: 6},
                       {color: '#008000', points: 7},
                       {color: '#00FFFF', points: 8},
                       {color: '#008080', points: 9},
                       {color: '#0000FF', points: 10},
                       {color: '#000080', points: 11},
                       {color: '#FF00FF', points: 12},
                       {color: '#800080', points: 13}                      
                      ];
  
  //eventlisteners 
  //mouse movement
  window.addEventListener('mousemove', function(event) {
    mouse.mx = event.x;
    mouse.my = event.y;
  })
  //window resize
  window.addEventListener('resize', function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  })
  // mouse click
  window.addEventListener('click', function(event) {
    click.cx = event.x;
    click.cy = event.y;
    //console.log(click.cx, " | ", event.x, " | ", click.cy, " | ", event.y)


    window.addEventListener('keydown', function(e) {
      //var key = e.key;
      if (e.key === "Escape") // ESC key
      {
        togglePause();
        alert("paused");
      }
    })


    //which circle
    var which;
    if ((which = circleArray.indexOf(hoveredCircle)) != -1) {
      circleArray.splice(which, 1);
      ballcount = ballcount - 1;
      total = total + points;
      $('#ballct').trigger('contentchanged');
      $('#points').trigger('pointschanged');
          
      pop.play();
    } else {
      //console.log('missed');
      miss.play();
      penalty();
    }
  })
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
      //these if statements prevent reverse the direction when the circle hits the bordes of the canvas  
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
      $('#ballct').trigger('contentchanged');
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
      $('#ballct').trigger('contentchanged');
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
    } else if (paused) {
      paused = false;
    }

  }

  function updatePoints() {
    $('#points').trigger('pointschanged');
  }
  
//   function getPoints() {

//       switch (this.fillcolor) {
//         case '#000000':
//           this.points = 1;
//           break;
//         case '#FF0000':
//           this.points = 2;
//           break;
//         case '#800000':
//           this.points = 3;
//           break;
//         case '#FFFF00':
//           this.points = 4;
//           break;
//         case '#808000':
//           this.points = 5;
//           break;
//         case '#00FF00':
//           this.points = 6;
//           break;
//         case '#008000':
//           this.points = 7;
//           break;
//         case '#00FFFF':
//           this.points = 8;
//           break;
//         case '#008080':
//           this.points = 9;
//           break;
//         case '#0000FF':
//           this.points = 10;
//           break;
//         case '#000080':
//           this.points = 11;
//           break;
//         case '#FF00FF':
//           this.points = 12;
//           break;
//         case '#800080':
//           this.points = 13;
//           break;
//       }
//     }
  
  function search(fillColor, colorObjArray){
    for (var i=0; i < colorObjArray.length; i++) {
        if (colorObjArray[i].color === fillColor) {
            return colorObjArray[i].points;
        }
    }
} 

  function updateBallCt() {
    $('#ballct').trigger('contentchanged');
  }

  $(document).on('pointschanged', '#points', function() {
    // do something after the div content has changed
    $('#points').text(total.toString());
  });



  $(document).on('contentchanged', '#ballct', function() {
    // do something after the div content has changed
    $('#ballct').text(ballcount.toString());
  });



  init();
  animate();
  //console.log('animate function');
  // End of Document Ready Function
});