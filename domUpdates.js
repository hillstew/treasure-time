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

  displaySpunElement(element) {
    $('.js-user-instructions').text(`You turned towards a treasure trove of ${element}`);
  },

  disableElement(nameOfClass) {
    $(`${nameOfClass}`).prop('disabled', true);
    $(`${nameOfClass}`).css('background-color', 'tomato');
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
    $('.js-user-instructions').text(`${name}, click Spin, Solve Puzzle or Buy a Vowel. Reminder it costs $100 to buy a vowel.`);
  }
}

if (typeof module !== 'undefined') {
  module.exports = domUpdates;
}


