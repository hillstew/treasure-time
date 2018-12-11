const game = new Game();

$('.js-start-btn').on('click', function() {
  game.start();
});

$('.js-spin-btn').on('click', function() {
  game.currentWheel.spin();
  game.checkWheelElement();
});

$('.js-letters').on('click', function(e) {
  let playerSelection = $(this).text();
  if ($(e.target).hasClass('disabled-letters')) {
    alert('That letter has already been chosen. Please pick another letter');
  } else {
    $(e.target).addClass('disabled-letters');
    game.intakeGuess(playerSelection);
  }
});



