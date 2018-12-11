class Wheel {
  constructor() {
    this.elements = []
    this.currentElement = null;
  }

  createWheelElements() {
    const wheelBank = data.wheel.concat();
    for (let i = 1; i < 7; i++) {
      let index = this.createRandomNumber(wheelBank.length)
      this.elements.push(...wheelBank.splice(index, 1))
    }
  }

  createRandomNumber(maxRange) {
    const randomIndex = Math.floor(Math.random() * Math.floor(maxRange));
    return randomIndex;
  }

  spin() {
    let index = this.createRandomNumber(this.elements.length);
    this.currentElement = this.elements[index];

    domUpdates.displaySpunElement(this.currentElement);
    domUpdates.disableElement('.js-spin-btn', 'tomato');

  }
}



// class BonusWheel extends Wheel {
//   constructor() {
//     super();
//     this.bonusElement = null;
//   }

//   awardBonusElement() {
//   }
// }

if (typeof module !== 'undefined') {
  module.exports = Wheel;
}

