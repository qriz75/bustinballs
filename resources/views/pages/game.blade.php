@extends('layouts.game-layout') @section('content')
<div id="gameContainer"><canvas id="game"></canvas></div>
<div class="gstats">

<div class="row">
  <div class="col-1">
  <div class="statCon" id=timeCon>
    <div class="gamelabel" id="time">Time left:</div>
    <div class="glow" id="timer">60</div>
  </div>
  </div>
  <div class="col-1">
  <div class="statCon" id=lvlCon>
    <div class="gamelabel" id="lvl">Level:</div>
    <div class="glow" id="level">1</div>
  </div>
  </div>
  <div class="col-4">
   <div class="statCon" id=ptsCon>
    <div class="gamelabel" id="pts">Points:</div>
    <div class="glow" id="points">-</div>
  </div>
  </div>
  <div class="col-2">
  <div class="statCon" id=pomCon>
    <div class="gamelabel" id="pom">Penalty on miss:</div>
    <div class="glow" id="penaltyct">-</div>
  </div>
  </div>
  <div class="col-2">
  <div class="statCon" id=ballCon>
    <div class="gamelabel" id="bls">Balls:</div>
    <div class="glow" id="ballct">-</div>
  </div>
  </div>
  <div class="col-2">
  <div class="statCon" id=clickCon>
    <div class="gamelabel" id="clks">Clicks:</div>
    <div class="glow" id="clicks">-</div>
  </div>
  </div> 
</div>
</div>
<div class="gcontrols">
  

  <div class="row">
    <div class="col-2" >
      <div class="monitor" id="stateCon"> </div><div class="monitor" id="stateMon">State: --></div>
      <div class="monitor" id="stateCon"></div><div class="monitor" id="runningMon">Running: --> </div>
      <div class="monitor" id="stateCon"></div><div class="monitor" id="pausedMon">Paused: --> </div>
      <div class="monitor" id="stateCon"></div><div class="monitor" id="levelMon">Level: --> </div>
      <div class="monitor" id="stateCon"></div><div class="monitor" id="timeMon">Time: --> </div>
      <div class="monitor" id="stateCon"></div><div class="monitor" id="countMon">Count: --> </div>
      <div class="monitor" id="stateCon"></div><div class="monitor" id="pointsMon">Points: --> </div>
      <div class="monitor" id="stateCon"></div><div class="monitor" id="ballctMon">Ball Count: --> </div>
      <div class="monitor" id="stateCon"></div><div class="monitor" id="pomMon">Penalty: --> </div>
      <div class="monitor" id="stateCon"></div><div class="monitor" id="clicksMon">Clicks: --> </div>
      
    </div>    
  </div>
 </div>



<!-- The Next Level Modal -->
<!-- <div id="nextModal" class="modal">


  <!-- Modal content -->
<!--   <div class="modal-content">    
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>
            <div id="levelNum"></div>
          </h2>
        </div>
      </div>
      <div class="row">       
        <div class="col-3"><h3>Time left:</h3>
          <h3><div id="tl"></div></h3><br></div>
        <div class="col-3"><h3>Bonus Points:</h3>
          <h3><div id="bp"></div></h3><br></div>
        <div class="col-3"><h3>Total Points:</h3>
          <h3><div id="tp"></div></h3><br> </div>
        <div class="col-3"><h3>Total Clicks:</h3>
          <h3><div id="tc"></div><br></h3></div>
      </div>
    </div><br>
    <div class="row">    
    <div class="col-2">
       <button type="button" class="btn btn-danger" id="homeBtn" href="/home">Home</button>
      <button type="button" class="btn btn-primary" id="repeatBtn" data-dismiss="modal">Replay level</button>
    </div>
    <div class="col-8">
      
    </div>
    <div class="col-2">
      <button type="button" class="btn btn-success" id="nextBtn" >Next level</button>
    </div>
    
    </div>
    
  </div>

</div> -->

<!-- The Non Bootstrap Modal -->
<div id="nLC">
  <div id="nextLvlCon">  
      <div class="container" id="nextLvlMod">
        <div class="row">
          <div class="col-12">
            <h2>
              <div id="levelNum"></div>
            </h2>
          </div>
        </div>
        <div class="row">       
          <div class="col-3"><h3>Time left:</h3>
            <h3><div id="tl"></div></h3><br></div>
          <div class="col-3"><h3>Bonus Points:</h3>
            <h3><div id="bp"></div></h3><br></div>
          <div class="col-3"><h3>Total Points:</h3>
            <h3><div id="tp"></div></h3><br> </div>
          <div class="col-3"><h3>Total Clicks:</h3>
            <h3><div id="tc"></div><br></h3></div>
        </div>
      </div><br>
      <div class="row">    
      <div class="col-2">
         <button type="button" class="btn btn-danger" id="homeBtn" href="/home">Home</button>
        <button type="button" class="btn btn-primary" id="repeatBtn" data-dismiss="modal">Replay level</button>
      </div>
      <div class="col-8">      
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-success" id="nextBtn" >Next level</button>
      </div>    
      </div>
    </div>
</div>

<!-- The Modal -->
<div id="overModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
    <!-- Trigger/Close The Modal -->
    <button id="clBtn" data-dismiss="modal">Start next level</button>
  </div>

</div>
<div class="readyGo">
  <div id="readyGo"></div>
</div>



<audio id="discosound" src="/assets/sounds/disco.mp3" preload="auto">
  <source  type="audio/mpeg">
</audio>

<audio id="pop" src="/assets/sounds/pop.mp3"></audio>

<div class="discoball" hidden>
  <img id="discoball" src="/assets/disco_sl.gif">
</div>
<div class="dance" hidden>
  <img id="carlton" src="/assets/img/dancers/carlton.gif">
  <img id="jack" src="/assets/img/dancers/jack1.gif">
  <img id="girl1" src="/assets/img/dancers/girl1.gif">
</div>

<link rel="stylesheet" href="/css/disco.css">
<!-- <link rel="stylesheet" href="/css/modal.css"> -->
<!-- <script src="/js/inc/timer.js"></script> -->
<!-- <script src="/js/inc/party.js"></script> -->
@endsection