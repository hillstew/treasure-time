const game = new Game();

$('.js-start-btn').on('click', function() {
  game.start();
});

$('.js-spin-btn').on('click', function() {
  game.currentWheel.spin();
  
  if (game.currentRound < 5) {
    game.checkWheelElement();
  }
});

$('.js-letters').on('click', function(event) {

  if (!$('.js-spin-btn').is(':disabled')) {
    alert('Please click on Spin, Solve Puzzle or Buy a Vowel before selecting a letter');
    return;
  };

  if ($(event.target).hasClass('disabled-letters')) {
    alert('That letter has already been chosen. Please pick another letter');
    return;
  } 

  if($(event.target).hasClass('temp-disable')) {
    alert('You did not select a vowel. Chooses from the highlighted vowels below.');
    return;
  }

  if($('.js-spin-btn').is(':disabled') && $(event.target).hasClass('vowel') && !$('.js-spin-btn').hasClass('vowel-time')) {
    alert('You cannot pick a vowel. Please choose a consonant.');
    return;
  }

  let playerSelection = $(this).text();

  $(event.target).removeClass('highlighted-vowel');
  $(event.target).addClass('disabled-letters');
  game.intakeGuess(playerSelection);  
});

$('.js-vowel-btn').on('click', function() {
  domUpdates.disableElement('.js-spin-btn', '#b1b2b4')
  $('.js-spin-btn').addClass('vowel-time');
  $('.consonant').addClass('temp-disable');
  game.canPlayerBuyVowel();
})

$('.js-solve-btn').on('click', function() {
  domUpdates.displaySolvePopup();
})

$('.js-user-instructions').on('click', function(event) {
  let guess = $('.js-answer-input').val()
  
  if ($(event.target).hasClass('js-submit-btn')) {
    game.intakePhrase(guess);
  }
})

$('.js-restart-btn').on('click', () => {
  location.reload();
});

$('.js-puzzle-section').on('click', function(event) {
  if ($(event.target).hasClass('js-bonus-round-btn')) {
    game.startBonusRound();
  }
});

$('.js-bonus-inputs-btn').on('click', function(event) {
  let letters = domUpdates.getBonusInputs()
  game.intakeBonusInputs(letters);
  $('.js-user-instructions').empty().append(`<h3>Try to solve the puzzle to claim your treasure</h3>`)
  $('.js-bonus-input-sect').empty().append(`
    <input class="solve-bonus-input js-solve-bonus-input" type="text">
    <button class="solve-bonus-btn js-solve-bonus-btn">Solve</button>
    `)
});

$('.js-bonus-input-sect').on('click', function(event) {
  let bonusGuess = $('.js-solve-bonus-input').val()
  
  if ($(event.target).hasClass('js-solve-bonus-btn')) {
    game.intakeBonusPhrase(bonusGuess);
    $('.js-solve-bonus-input').hide();
    $('.js-solve-bonus-btn').hide();   
  }
});
  




