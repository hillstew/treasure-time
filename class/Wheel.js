class Wheel {
  constructor(elements) {
    this.elements = elements;
    this.currentElement = null;
  }

  spin() {
  }
}

class BonusWheel extends Wheel {
  constructor() {
    super();
    this.bonusElement = null;
  }

  awardBonusElement() {
  }
}

if (typeof module !== 'undefined') {
  module.exports = Wheel;
}

