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
    let puzzleSection = $('.js-puzzle-section').empty();
    let splitAnswer = answer.split(' ');
    let firstRow = [];
    let secondRow = [];
    if (splitAnswer.length >= 2 && answer.length > 16) {
      let numToSplice = Math.ceil((splitAnswer.length / 2))
      let firstRowElements = splitAnswer.splice(0, numToSplice);
      firstRow.push(...firstRowElements)
      secondRow = splitAnswer.concat();
      puzzleSection.append(`<div class="first-row-div"></div>`)
      puzzleSection.append(`<div class="second-row-div"></div>`)
      puzzleSection.css({'display': 'grid', 'grid-template-rows': '65px 65px'})
      let counter = 0;
      firstRow.forEach((word) => {
        counter++
        $('.first-row-div').append(`<span class="first-row-${counter}"></span>`);
        let chars = word.split('');
        chars.forEach((char) => {
          if (char === '\u0027' || char === '\u0026' || char === '\u002d') {
            $(`.first-row-${counter}`).append(`<p class="special-char">${char}</p>`);
          } else {
            $(`.first-row-${counter}`).append(`<p class="puzzle-letters">${char}</p>`);
          }
        })
      })
      counter = 0;
      secondRow.forEach((word) => {
        counter++
        $('.second-row-div').append(`<span class="second-row-${counter}"></span>`);
        let chars = word.split('');
        chars.forEach((char) => {
          if (char === '\u0027' || char === '\u0026' || char === '\u002d') {
            $(`.second-row-${counter}`).append(`<p class="special-char">${char}</p>`);
          } else {
            $(`.second-row-${counter}`).append(`<p class="puzzle-letters">${char}</p>`);
          }
        })
      })
    } else {
      answer = [...answer]
      answer.forEach((char) => {
        let whiteSpace = '\u0020'
        let specialChars = ['\u0027', '\u0026', '\u002d'];
        if (char !== whiteSpace && !specialChars.includes(char)) {
          puzzleSection.append(`<p class="puzzle-letters">${char}</p>`);
        } else if (specialChars.includes(char)) {
          puzzleSection.append(`<p class="special-char">${char}</p>`)
        } else {
          puzzleSection.append(`<p class="whitespace">${char}</p>`);
        }
      })
    }
  },

  displayBonusPuzzle(answer, category) {
    $('.js-category').text(category);
    answer = [...answer]
      let vowels = ['a', 'e', 'i', 'o', 'u'];
      let onlyConsonants = answer.filter(letter => {
        return !vowels.includes(letter)
      });
      // tale word and pull out all vowels
      // generate three random indexs with maxRange being consonatArray.length
      // grab the three consonats at those three random indexs (from consonatArray)
      // char is included in our consonatnsToShow array, make them blue;

    answer.forEach((char) => {
      let specialChars = ['\u0027', '\u0026', '\u002d'];
      let vowels = ['a', 'e', 'i', 'o', 'u'];
      if (!specialChars.includes(char)) {
        //actual letters
        //always show three random consonants
        // 
        puzzleSection.append(`<p class="puzzle-letters">${char}</p>`);
      } else if (specialChars.includes(char)) {
        puzzleSection.append(`<p class="special-char">${char}</p>`)
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
  displayGrandScore(grandScore, winnerName) {
    let targetCard = $(`article:contains(${winnerName})`);
    targetCard.find('.js-grand-score').text(`Total: ${grandScore}`);
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
    $('.js-available').removeClass('disabled-vowels').addClass('highlighted-vowel');

  },

  displayVowelInstructions() {
    $('.js-user-instructions').empty().append(`<p class="user-choices">Choose a highlighted vowel below</p>`);
  },

  removeClass(classToFindElementWith, classNameToRemove) {
    $(`${classToFindElementWith}`).removeClass(`${classNameToRemove}`);
  }, 

  displaySolvePopup() {
    $('.js-user-instructions').empty().append(`<p>Enter your guess below</p><div class="flex-answer"><input class="answer-input js-answer-input" type="text"></input><button class="answer-submit-btn js-submit-btn">Submit</button></div>`);
  },

  displayRoundWinner(winner, currentRound) {
    $('.js-user-popup').text(`Arrrrrr ${winner}, you solved the puzzle for Round ${currentRound} and get to keep your treasure!`).show()
  },

  resetLetters() {
    $('.js-letters').removeClass('disabled-letters');
  },

  emptyPuzzleSection() {
    $('.js-puzzle-section').empty();
  },

  displayWinner(winnerName) {
    $('.js-puzzle-section').css('flex-direction', 'column');
    $('.js-user-instructions').empty()
    $('.js-puzzle-section').append(`<h2>Congratulations ${winnerName} you have the most treasure!</h2><p>Click below to start your bonus adventure for one last chance to get more treasure!</p><button class="bonus-round-btn js-bonus-round-btn">Start Bonus Treasure Round</button>`)
    $('.user-section').hide();
    $('.letters-section').hide();
  },

  setupBonusRoundDisplay(answer, category) {
    $('.user-section').show();
    $('.letters-section').show();
    $('.js-round-display').text(`Bonus Treasure Round`);
    $('.js-puzzle-section').css('display', 'flex');
    $('.js-puzzle-section').css('flex-direction', 'row');
    this.displayBonusPuzzle(answer, category);
    //generate random indexes
    //reveal those letters only if they are not included in [a, e, i ,o ,u]
  }
}

if (typeof module !== 'undefined') {
  module.exports = domUpdates;
}


