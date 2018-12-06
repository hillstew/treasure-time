class Wheel {
  constructor() {
    this.elements = [];
    this.currentElement = null;
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