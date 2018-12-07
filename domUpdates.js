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
    console.log(answer)
    $('.js-category').text(category)
    let puzzleSection = $('.js-puzzle-section')
    answer.forEach((character) => {
      puzzleSection.append(`<p>${character}</p>`)
    })
  }
}


