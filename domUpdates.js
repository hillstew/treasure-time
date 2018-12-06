const domUpdates = {
  
  hideStartScreen() {
    $('.js-start-screen').hide();  
  },

  getPlayerNames() {
    return [$('.js-player1').val(), 
            $('.js-player2').val(), 
            $('.js-player3').val()
           ];
  }
}


