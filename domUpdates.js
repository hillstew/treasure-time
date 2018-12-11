const domUpdates = {
  
  hideStartScreen() {
    $('.js-start-screen').hide();  
  },

  getPlayerNames() {
    return [
      $('.js-player1').val(), 
      $('.js-player2').val(), 
      $('.js-player3').val()
    ];
  },

  displayPuzzle(answer, category) {
    $('.js-category').text(category);
    let puzzleSection = $('.js-puzzle-section');
    answer.forEach((character) => {
      if (character !== '\u0020') {
        puzzleSection.append(`<p class="puzzle-letters">${character}</p>`);
      } else {
        puzzleSection.append(`<p class="whitespace">${character}</p>`);
      }
    })
  },

  displaySpunElement(element, name) {
    $('.js-user-instructions').empty().append(`<h3>You turned towards a treasure trove of $${element}</h3><p>To claim the treasure, choose a letter below in hopes it matches the phrase.</p>`);
  },

  disableElement(nameOfClass, color) {
    $(`${nameOfClass}`).prop('disabled', true);
    $(`${nameOfClass}`).css('background-color', `${color}`);
  },

  enableElement(nameOfClass) {
    $(`${nameOfClass}`).prop('disabled', false);
    $(`${nameOfClass}`).css('background-color', '#125af5');
  },

  displayUpdatedScore(score, playerName) {
    let targetCard = $(`article:contains(${playerName})`);
    targetCard.find('.js-round-score-num').text(score);
  },

  displayPlayerNames(names) {
    let targetCards = $('article:contains(Player)');
    let index = 0;
    targetCards.each(function() {
      $(this).find('h2').text(names[index]);
      index++;
    });
  },

  displayLetter(letter) {
    $('.js-puzzle-section').find(`p:contains(${letter})`).css('color', '#125af5');
  },

  displayCurrentRound(round) {
    $('.js-round-display').text(`Round ${round}`);
  },

  displaySpinInstructions(name) {
    $('.js-user-instructions').empty().append(`<h2>Choose your adventure ${name}!</h2>
                                      <p class="user-choices">Click Spin, Solve Puzzle or Buy a Vowel.</p>
                                      <p class="vowel-reminder">Reminder it costs $100 to buy a vowel.</p>`);
    
  },

  displayUserMessage(currentElement) {
    if (currentElement === 'BANKRUPT') {
      $('.js-user-popup').text(`Shiver me timbers! Your treasure has been plundered! Your treasure chest is empty and you have lost your turn.`)
    } else {
      $('.js-user-popup').text(`The winds weren\'t in your favor. You steered in the wrong direction and lost your turn.`)
    }
    $('.js-user-popup').show()
  },

  hideUserMessage() {
    $('.js-user-popup').hide();
  },

  highlightCurrentUserCard(name) {
    $(`article:contains(${name})`).addClass('current-player-card');
  },

  unhighlightPrevUserCard(name) {
    $(`article:contains(${name})`).removeClass('current-player-card');
  },

  displayNotInPuzzle() {
    $('.js-user-popup').text(`Arrgggghhh! Your letter is not in the puzzle. Yer turn is over.`).show(); 
  },

  displayVowelError() {
    $('.js-user-popup').text(`You do not have enough treasure to buy a vowel`).show(); 
  },

  highlightVowels() {
    //grab the vowels and make they shineeee!
    $('.js-available').removeClass('disabled-vowels').addClass('highlighted-vowel');

  },

  displayVowelInstructions() {
    $('.js-user-instructions').empty().append(`<p class="user-choices">Choose a highlighted vowel below</p>`);
  },

  removeClass(classToFindElementWith, classNameToRemove) {
    $(`${classToFindElementWith}`).removeClass(`${classNameToRemove}`);
  }
}

if (typeof module !== 'undefined') {
  module.exports = domUpdates;
}


