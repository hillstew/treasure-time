const game = new Game();

$('.js-start-btn').on('click', function() {
  game.start();
});

$('.js-spin-btn').on('click', function() {
  game.currentWheel.spin();
  game.checkWheelElement();
});

$('.js-letters').on('click', function(e) {
  // if spin button is active and the target is a letter
  if (!$('.js-spin-btn').is(':disabled')) {
    alert('Please click on Spin, Solve Puzzle or Buy a Vowel before selecting a letter');
    return;
  };
  // if letter they clicked on has class disabled letters, you already chose that one!!!
  if ($(e.target).hasClass('disabled-letters')) {
    alert('That letter has already been chosen. Please pick another letter');
    return;
  } 
  // if the letter they clicked has class temp-disable, you must choose vowel not consonant!!!
  if($(e.target).hasClass('temp-disable')) {
    alert('You did not select a vowel. Chooses from the highlighted vowels below.');
    return;
  }

  //if the spin button is disabled and the target is a vowel
  //alert you cannot choose a vowel, you must choose a consonant
  if($('.js-spin-btn').is(':disabled') && $(e.target).hasClass('vowel') && !$('.js-spin-btn').hasClass('vowel-time')) {
    alert('You cannot pick a vowel. Please choose a consonant.');
    return;
  }


  let playerSelection = $(this).text();

    $(e.target).removeClass('highlighted-vowel');
    $(e.target).addClass('disabled-letters');
    game.intakeGuess(playerSelection);
  
});

$('.js-vowel-btn').on('click', function(e) {
  domUpdates.disableElement('.js-spin-btn', 'yellow')
  $('.js-spin-btn').addClass('vowel-time');
  $('.consonant').addClass('temp-disable');
  game.canPlayerBuyVowel();
})



