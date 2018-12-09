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
    $('.js-category').text(category)
    let puzzleSection = $('.js-puzzle-section')
    answer.forEach((character) => {
      puzzleSection.append(`<p>${character}</p>`)
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
  }
}

if (typeof module !== 'undefined') {
  module.exports = domUpdates;
}


