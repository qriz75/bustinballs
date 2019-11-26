
  
  //helper function to get key code
//   document.addEventListener("keydown", function(event) {
//   alert(event.which);
// })
  
  $(document).on('keypress',function(event) {
    if(event.which === 80) {
      //alert("The party is on!");
      toggleParty();
    
    }});
  
  function toggleParty(){
    //alert("The party is on!");
      var audio = $('#discosound')[0];
      audio.loop = false;
      audio.play();
     $('.discoball').removeAttr('hidden');  
  }
  
  

   