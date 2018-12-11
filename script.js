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
  game.intakeGuess(playerSelection);
});



