global.data = require('../dataset.js');
global.domUpdates = require('../domUpdates.js');
global.Game = require('../class/Game.js');
global.Puzzle = require('../class/Puzzle.js');
const BonusPuzzle = require('../class/BonusPuzzle.js');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

describe('it should create a bonus puzzle', function() {
  let bonusPuzzle;
  let puzzleObj = {  
    category:'Around The House',
    number_of_words: 1,
    total_number_of_letters: 10,
    first_word: 10,
    description: 'Location or object(s) found within a typical house.',
    correct_answer: 'Snowblower',
  }

  beforeEach( function() {
    chai.spy.on(global.domUpdates, ['displayLetter'], () => true);
    bonusPuzzle = new BonusPuzzle(puzzleObj);
  });

  afterEach(() => {
    chai.spy.restore(global.domUpdates);
  })

  it.skip('should check user guess and return whether it matches answer', function(){
    let userGuess = 'Charger';
    bonusPuzzle.checkAnswer(userGUess);
  });
})