global.data = require('../dataset.js');
global.domUpdates = require('../domUpdates.js');
const Wheel = require('../class/Wheel.js');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

describe('it should create a wheel', function() {
  let wheel;
  beforeEach( function() {
    wheel = new Wheel();
  })

  afterEach(() => {
    chai.spy.restore(global.domUpdates);
  })

  it('should create wheel elements', function() {
    wheel.createWheelElements();
    expect(wheel.elements).to.be.an('array').to.have.lengthOf(6)
    wheel.elements.forEach(function(element) {
      expect(element).to.not.be.null; 
      expect(element).to.not.be.undefined;
    })
  });

  it('should be able to generate a number given a max range', function() {
    let maxRange = 45;
    let num = wheel.createRandomNumber(maxRange);
    expect(num).to.be.within(0, maxRange);
  });
})