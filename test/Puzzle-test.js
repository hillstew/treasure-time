global.data = require('../dataset.js');
global.domUpdates = require('../domUpdates.js');
const Puzzle = require('../class/Puzzle.js');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

describe('it should create a puzzle', function() {
  let puzzle;
  let puzzleObj = {  
    category: 'The 90s',
    number_of_words: 1,
    total_number_of_letters: 7,
    first_word: 7, 
    description:'Puzzles pertaining to the decade in question.',
    correct_answer: 'Beepers',
  }

  beforeEach( function() {
    puzzle = new Puzzle(puzzleObj);
  });

  afterEach(() => {
    chai.spy.restore(global.domUpdates);
  })

  it('should be able validate the players guess', function() {
    let guess = 'B'
    expect(puzzle.validateGuess(guess)).to.be.true
    guess = 'Z'
    expect(puzzle.validateGuess(guess)).to.be.false
  });
})
