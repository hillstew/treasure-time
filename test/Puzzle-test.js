global.data = require('../dataset.js');
global.domUpdates = require('../domUpdates.js');
global.Game = require('../class/Game.js');
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
    chai.spy.on(global.domUpdates, ['displayLetter'], () => true);
    puzzle = new Puzzle(puzzleObj);
  });

  afterEach(() => {
    chai.spy.restore(global.domUpdates);
  })

  it('should have all properties from constructor', function() {
    expect(puzzle.answer).to.equal('BEEPERS')
    expect(puzzle.category).to.equal('The 90s')
    expect(puzzle.description).to.equal('Puzzles pertaining to the decade in question.')
    expect(puzzle.numberOfWords).to.equal(1)
    expect(puzzle.totalLetters).to.equal(7)
    expect(puzzle.lettersInFirst).to.equal(7)
  });

  it('should be able validate the players guess as correct', function() {
    let guess = 'B';
    puzzle.validateGuess(guess);
    expect(domUpdates.displayLetter).to.have.been.called(1);
    expect(puzzle.validateGuess(guess)).to.be.true
  });

  it('should be able to validate the players guess as incorrect', function() {
    let guess = 'Z';
    puzzle.validateGuess(guess);
    expect(puzzle.validateGuess(guess)).to.be.false  
  });

  it('should check if a letter is a vowel', function() {
    let selectedLetter = 'E';
    puzzle.isLetterAVowel(selectedLetter);
  });

  it('should check user guess and return whether it matches answer', function() {
    let userGuess = 'Charger';
    expect(puzzle.checkAnswer(userGuess)).to.be.false;
    userGuess = 'Beepers';
    expect(puzzle.checkAnswer(userGuess)).to.be.true;
  });
})
