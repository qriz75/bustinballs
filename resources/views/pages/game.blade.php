@extends('layouts.game-layout')

@section('content')
<div class="gcontrols">
  <div class="container">
    <div class="row">
      <div class="col-1"><div class="glow" id="timer">60</div></div>
      <div class="col-1"><div class="glow" id="level">-</div></div>
      <div class="col-4"><div class="glow" id="points">-</div></div>      
      <div class="col-1"><div class="glow" id="penaltyct">-</div></div>
      <div class="col-1"><div class="glow" id="ballct">-</div></div>    
    </div>
  </div>
</div>

<audio id="discosound" src="/assets/disco.mp3" preload="auto">
  <source  type="audio/mpeg">
</audio>
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