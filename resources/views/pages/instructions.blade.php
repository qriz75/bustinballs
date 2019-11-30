@extends('layouts/gui-layout') @section('content')
<div class="container">
  <div class="row">
    <div class="col-1">

    </div>

    <div class="col-10">



      <h1>Rules:</h1>
      <br>
      <p>
        The goal of the game is to remove the balls by clicking on them. Balls enlarge upon hovering over them. </p>
      <p>
        The game is over when the timer reaches 0. The current level is accomplished when all balls are removed.<br>
        Different colors yield different points. <br> 
        
        <div class="list" id="colorCode"></div> 
        
        After all balls are removed from the screen, a pop up will appear and show the game stats. Bonus
        points are awarded for each second left. The bonus calculation is progressive and the faster one can finish the more points will be earned. <br> 1st second counts 1 point, 2nd second is 2 points plus the previous point totalling 3. 3rd is 3 plus
        the 3 for 2nd -> makes 6 ... etc. 10 seconds left this will be 55 bonus points at 30 seconds 465. <br>
      </p>
    </div>
    <div class="col-1">

    </div>
  </div>
</div>
@endsection