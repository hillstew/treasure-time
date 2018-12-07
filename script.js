const game = new Game();

$('.js-start-btn').on('click', function() {
  game.start();
});

$('.js-spin-btn').on('click', function() {
  game.currentWheel.spin();
})