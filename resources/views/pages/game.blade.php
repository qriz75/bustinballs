@extends('layouts.game-layout') @section('content')
<div id="gameContainer"><canvas id="game"></canvas></div>
<div class="gcontrols">
 
    

      <div class="gamelabel" id="time">Time left:</div>
      <div class="gamelabel" id="lvl">Level:</div>
      <div class="gamelabel" id="pts">Points:</div>
      <div class="gamelabel" id="pom">Penalty on miss:</div>
      <div class="gamelabel" id="bls">Balls:</div>
    
    
      
        <div class="glow" id="timer">10</div>
     
        <div class="glow" id="level">-</div>
     
        <div class="glow" id="points">-</div>
     
        <div class="glow" id="penaltyct">-</div>
     
        <div class="glow" id="ballct">-</div>
    </div>


<audio id="discosound" src="/assets/disco.mp3" preload="auto">
  <source  type="audio/mpeg">
</audio>

<audio id="pop" src="/assets/sounds/pop.mp3"></audio>
<p id="instructions">
  Shift + P --> Party Mode
</p>
<div class="discoball" hidden>
  <img id="discoball" src="/assets/disco_sl.gif">
</div>

<link rel="stylesheet" href="/css/disco.css">
<script src="/js/inc/timer.js"></script>
<script src="/js/inc/party.js"></script>
@endsection