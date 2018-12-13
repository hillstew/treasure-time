global.data = require('../dataset.js');
global.domUpdates = require('../domUpdates.js');
global.Player = require('../class/Player.js');
global.Puzzle = require('../class/Puzzle.js');
global.Wheel = require('../class/Wheel.js');
global.BonusWheel = require('../class/BonusWheel.js');
const chai = require('chai');
const expect = chai.expect;
const Game = require('../class/Game.js');
const spies = require('chai-spies');
chai.use(spies);

describe('Game', function() {
  let game;

  beforeEach( function() {
    game = new Game();
    chai.spy.on(global.domUpdates, ['getPlayerNames'], () => ['first', 'second', 'third']);
    chai.spy.on(global.domUpdates, [
      'displayCurrentRound', 
      'displayGrandScore', 
      'displayRoundWinner',
      'displayLetter', 
      'displayNotInPuzzle', 
      'displayPlayerNames', 
      'displayPuzzle', 
      'displaySpinInstructions', 
      'displaySpunElement', 
      'displayUpdatedScore', 
      'displayUserMessage', 
      'displayVowelError', 
      'displayVowelInstructions', 
      'displayWinner',
      'emptyPuzzleSection',
      'enableElement', 
      'hideUserMessage', 
      'highlightCurrentUserCard', 
      'highlightVowels', 
      'hideStartScreen', 
      'removeClass', 
      'resetLetters', 
      'setupBonusRoundDisplay',
      'unhighlightPrevUserCard',
      'displayWonBonusElement',
      'displayDidNotWinBonusElement'
      ], () => true);
  });

  afterEach(() => {
    chai.spy.restore(global.domUpdates);
  })

  it('it should start a game', function() {
    game.start();
    expect(game.currentWheel).to.have.property('elements').with.lengthOf(6);
    expect(game).to.have.property('players').with.lengthOf(3);
    expect(game).to.have.property('puzzles').with.lengthOf(3);
    expect(game.currentPuzzle).to.be.an.instanceOf(Puzzle);
    expect(domUpdates.getPlayerNames).to.have.been.called(1);
    expect(domUpdates.hideStartScreen).to.have.been.called(1);
    expect(domUpdates.displayPlayerNames).to.have.been.called(1);
    expect(domUpdates.displayPuzzle).to.have.been.called(1);
    expect(domUpdates.displayCurrentRound).to.have.been.called(1);
    expect(domUpdates.displaySpinInstructions).to.have.been.called(1);
    expect(domUpdates.highlightCurrentUserCard).to.have.been.called(1);
  });
  
  it('it should instanciate three players from Player class', function() {
    let playerNames = ['Hank', 'Dustin', 'Katiebelle'];
    game.createPlayers(playerNames);
    expect(game.players).to.have.lengthOf(3);
    expect(game.players[0, 1, 2]).to.be.an.instanceOf(Player);
  });

  describe('createPuzzleBank', function() {
    it('should return an array of puzzles', function() {
      let bankOfPuzzles = game.createPuzzleBank();
      expect(bankOfPuzzles).to.be.instanceOf(Array);
      expect(bankOfPuzzles).to.have.lengthOf(96);
    });  
  });

  describe('createBonusPuzzle', function() {
    it('should create a new puzzle for the bonus round', function() {
      game.createBonusPuzzle()
      expect(game.currentPuzzle).to.be.instanceOf(Puzzle)
      expect(game.currentPuzzle.answer.length).to.be.within(7, 20)
    });  
  });


  describe('createRandomNumber', function() {
    it('should be able to generate a number given a max range', function() {
      let maxRange = 45;
      let num = game.createRandomNumber(maxRange);
      expect(num).to.be.within(0, maxRange);
    });
  });

  describe('createPuzzles', function() {
    it('should be able to return an array of 5 puzzles', function() {
      game.createPuzzles();
      expect(game.puzzles).to.have.lengthOf(4);
      game.puzzles.forEach(function(puzzle) {
        expect(puzzle).to.be.an('object').that.has.all.keys('category', 'number_of_words', 'total_number_of_letters', 'first_word', 'description', 'correct_answer');
      });
    });
  });

  describe('createWheel', function() {
    it('should create an instance of Wheel', function() {
      game.createWheel();
      expect(game.currentWheel).to.be.instanceOf(Wheel);
    });
  });

  describe('createBonusWheel', function() {
    it('should create an instance of Bonus Wheel', function() {
      game.createBonusWheel();
      expect(game.currentWheel).to.be.instanceOf(BonusWheel);
    });
  });

  describe('intakeGuess', function() {
    it('should intake a users guess', function() {
      let players = ['first', 'second', 'third']
      players.forEach((playerName) => {
        let player = new Player(playerName);
        game.players.push(player);
      });

      let puzzleObj = {  
        category: 'The 90s',
        number_of_words: 1,
        total_number_of_letters: 7,
        first_word: 7, 
        description: 'Puzzles pertaining to the decade in question.',
        correct_answer: 'Beepers',
      }
      game.createWheel()
      game.currentPuzzle = new Puzzle(puzzleObj)
      let userGuess = 'P';
      game.intakeGuess(userGuess);
      userGuess = 'I'
      game.intakeGuess(userGuess);
    });
  });

  describe('changePlayerTurn', function() {
    it('should be able to change the player turn index', function() {
      let players = ['first', 'second', 'third']
      players.forEach((playerName) => {
        let player = new Player(playerName);
        game.players.push(player);
      });
      game.playersTurnIndex = 0
      game.changePlayerTurn();
      expect(domUpdates.unhighlightPrevUserCard).to.have.been.called(1);
      expect(game.playersTurnIndex).to.equal(1)
    });
  });

  describe('checkWheelElement', function() {
    it('should check wheel element after player spins to see if bankrupt', function() {
      let players = ['first', 'second', 'third']
      players.forEach((playerName) => {
        let player = new Player(playerName);
        game.players.push(player);
      });
      game.players[game.playersTurnIndex].currentScore = 2300;
      game.createWheel();
      game.currentWheel.currentElement = 'BANKRUPT'
      game.checkWheelElement();
      expect(game.players[game.playersTurnIndex - 1].currentScore).to.equal(0);
      expect(game.playersTurnIndex).to.equal(1);
    });
    it('should check wheel element after player spins to see if lose-a-turn', function() {
      let players = ['first', 'second', 'third']
      players.forEach((playerName) => {
        let player = new Player(playerName);
        game.players.push(player);
      });
      game.players[game.playersTurnIndex].currentScore = 2300;
      game.createWheel();
      game.currentWheel.currentElement = 'LOSE A TURN'
      game.checkWheelElement();
      expect(game.players[game.playersTurnIndex - 1].currentScore).to.equal(2300);
      expect(game.playersTurnIndex).to.equal(1);
    });
  });

  describe('canPlayerBuyVowel & letPlayerBuyVowel', function() {
    it('should check if a player can buy a vowel', function() {
      let players = ['first', 'second', 'third']
      players.forEach((playerName) => {
        let player = new Player(playerName);
        game.players.push(player);
      });
      game.createWheel();
      game.currentWheel.currentElement = 600
      game.players[game.playersTurnIndex].currentScore = 2300;
      game.canPlayerBuyVowel();
      expect(game.currentWheel.currentElement).to.equal(-100);
      game.currentWheel.currentElement = 700
      game.players[game.playersTurnIndex].currentScore = 0;
      game.canPlayerBuyVowel();
      expect(game.currentWheel.currentElement).to.equal(700);
    });
  });

  describe('inTakePhrase', function() {
    it('should intake a users guessed phrase, if wrong update player turn index, otherwise update players grand score', function() {
      let players = ['first', 'second', 'third']
      players.forEach((playerName) => {
        let player = new Player(playerName);
        game.players.push(player);
      });
      let puzzleObj = {  
        category: 'The 90s',
        number_of_words: 1,
        total_number_of_letters: 7,
        first_word: 7, 
        description: 'Puzzles pertaining to the decade in question.',
        correct_answer: 'Beepers',
      }
      game.currentPuzzle = new Puzzle(puzzleObj);
      let guess = 'Wrong';
      game.intakePhrase(guess);
      expect(game.playersTurnIndex).to.equal(1)
      game.players[game.playersTurnIndex].currentScore = 900;
      game.players[game.playersTurnIndex].grandScore = 0;
      guess = 'Beepers';
      game.intakePhrase(guess);
      expect(game.players[game.playersTurnIndex].grandScore).to.equal(900);
    });
  });

  describe('createNewRound', function() {
    it('should be able to create a new round', function() {
      let players = ['first', 'second', 'third']
      players.forEach((playerName) => {
        let player = new Player(playerName);
        game.players.push(player);
      });
      game.puzzles = [{  
        category: 'The 90s',
        number_of_words: 1,
        total_number_of_letters: 7,
        first_word: 7, 
        description: 'Puzzles pertaining to the decade in question.',
        correct_answer: 'Mousepad',
      }]
      game.createNewRound();
      expect(game.currentRound).to.equal(2);
      expect(game.currentPuzzle.answer).to.equal('MOUSEPAD');
    });
  });

  describe('determineWinner', function() {
    it('should be able to determine and assign a grand winner', function() {
      let players = ['first', 'second', 'third']
      players.forEach((playerName) => {
        let player = new Player(playerName);
        game.players.push(player);
      });
      game.players[0].grandScore = 1200;
      game.players[1].grandScore = 4450;
      game.players[2].grandScore = 340;
      game.determineWinner()
      expect(game.grandWinner.winner.name).to.equal('second');
    });
  });

  describe('startBonusRound', function() {
    it('should be able to start a bonus round and instantiate a BonusWheel', function() {
      let players = ['first', 'second', 'third']
      players.forEach((playerName) => {
        let player = new Player(playerName);
        game.players.push(player);
      });
      game.grandWinner = { winner: { name: 'second', currentScore: 0, grandScore: 4450 }}
      game.startBonusRound();
      expect(game.currentWheel).to.be.an.instanceOf(BonusWheel);
    });
  });

  describe('intakeBonusPhrase', function() {
    it('should intake player guessed phrase, if correct update grand score with bonus element', function() {
      let players = ['first', 'second', 'third']
      players.forEach((playerName) => {
        let player = new Player(playerName);
        game.players.push(player);
      });
      let puzzleObj = {  
        category: 'The 90s',
        number_of_words: 1,
        total_number_of_letters: 7,
        first_word: 7, 
        description: 'Puzzles pertaining to the decade in question.',
        correct_answer: 'Beepers',
      }
      game.createBonusWheel();
      game.currentPuzzle = new Puzzle(puzzleObj);
      game.grandWinner = { winner: { name: 'second', currentScore: 0, grandScore: 4450 }}
      game.currentWheel.currentElement = 5000;
      let guess = 'WRONG';
      game.intakeBonusPhrase(guess);
      expect(game.grandWinner.winner.grandScore).to.equal(4450);
      guess = 'BEEPERS';
      game.intakeBonusPhrase(guess);
      expect(game.grandWinner.winner.grandScore).to.equal(9450);
    });
  });







})