class Wheel {
  constructor(elements) {
    this.elements = elements;
    this.currentElement = null;
  }

  spin() {
    console.log("i am spinnnnningggggggg")
    console.log(this.elements)
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