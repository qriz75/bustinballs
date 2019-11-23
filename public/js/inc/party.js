
  
  //helper function to get key code
//   document.addEventListener("keydown", function(event) {
//   alert(event.which);
// })
  
  $(document).on('keypress',function(event) {
    if(event.which === 80) {
      //alert("The party is on!");
      var audio = $('#discosound')[0];
      audio.loop = true;
      audio.play();
     $('.discoball').removeAttr('hidden');
    
    }
  
        //toggleParty();
        
      
    });
  
  function toggleParty(){
    
   
  $('#discobutton').click(function(){
   
    
    
    
  });
  
  
}

   