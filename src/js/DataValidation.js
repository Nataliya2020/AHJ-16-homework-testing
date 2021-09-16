export default class DataValidation {
  constructor(ui) {
    this.ui = ui;
    this.cards = [];
    this.cardName = '';
    this.res = null;
    this.valid = 0;
    this.controlNumber = 0;
    this.valueInput = '';
    this.notification = document.querySelector('.notification');
    this.input = document.querySelector('.input-field');
  }

  checkingThePayment(value) {
    this.cardName = '';
    if (Number(value.slice(0, 1)) === 2) {
      this.cardName = 'world';
    }

    if (Number(value.slice(0, 2)) === 30
      || Number(value.slice(0, 2)) === 36
      || Number(value.slice(0, 2)) === 38
      || Number(value.slice(0, 2)) === 54
      || Number(value.slice(0, 2)) === 55) {
      this.cardName = 'diners';
    }

    if (Number(value.slice(0, 2)) === 31
      || Number(value.slice(0, 2)) === 35) {
      this.cardName = 'jcb';
    }

    if (Number(value.slice(0, 2)) === 34
      || Number(value.slice(0, 2)) === 37) {
      this.cardName = 'american-express';
    }

    if (Number(value.slice(0, 1)) === 4) {
      this.cardName = 'visa';
    }

    if (Number(value.slice(0, 2)) === 51
      || Number(value.slice(0, 2)) === 52
      || Number(value.slice(0, 2)) === 53
    ) {
      this.cardName = 'masterCard';
    }
    if (Number(value.slice(0, 2)) === 60) {
      this.cardName = 'discover';
    }
    return this.cardName;
  }

  validValue(value) {
    if (Number.isNaN(Number(value))) {
      this.res = false;
    } else {
      this.res = true;
    }
    return this.res;
  }

  checkingThePaymentSystem(event) {
    this.notification = event.target.closest('.validation-container')
      .querySelector('.notification');

    if (!this.validValue(event.target.value)) {
      this.notification.innerHTML = 'Вводите только числа';
    }

    if ((event.key === 'Backspace' && this.validValue(event.target.value)) || event.target.value.length === 0) {
      this.notification.innerHTML = '';
      this.input.classList.remove('valid');
      this.input.classList.remove('invalid');
    }

    this.cards = event.target.closest('.validation-container')
      .querySelectorAll('.card');

    this.valueInput = event.target.value;

    const valuePayment = this.checkingThePayment(this.valueInput);
    if (valuePayment === 'world') {
      this.cards.forEach((item) => {
        if (!item.classList.contains('card-world')) {
          item.classList.add('card-mask');
        } else {
          item.classList.remove('card-mask');
        }
      });
    } else if (valuePayment === 'diners') {
      this.cards.forEach((item) => {
        if (!item.classList.contains('card-diners')) {
          item.classList.add('card-mask');
        } else {
          item.classList.remove('card-mask');
        }
      });
    } else if (valuePayment === 'jcb') {
      this.cards.forEach((item) => {
        if (!item.classList.contains('card-jcb')) {
          item.classList.add('card-mask');
        } else {
          item.classList.remove('card-mask');
        }
      });
    } else if (valuePayment === 'american-express') {
      this.cards.forEach((item) => {
        if (!item.classList.contains('card-american-express')) {
          item.classList.add('card-mask');
        } else {
          item.classList.remove('card-mask');
        }
      });
    } else if (valuePayment === 'visa') {
      this.cards.forEach((item) => {
        if (!item.classList.contains('card-visa')) {
          item.classList.add('card-mask');
        } else {
          item.classList.remove('card-mask');
        }
      });
    } else if (valuePayment === 'masterCard') {
      this.cards.forEach((item) => {
        if (!item.classList.contains('card-masterCard')) {
          item.classList.add('card-mask');
        } else {
          item.classList.remove('card-mask');
        }
      });
    } else if (valuePayment === 'discover') {
      this.cards.forEach((item) => {
        if (!item.classList.contains('card-discover')) {
          item.classList.add('card-mask');
        } else {
          item.classList.remove('card-mask');
        }
      });
    } else {
      for (const card of this.cards) {
        card.classList.remove('card-mask');
      }
    }
  }

  validNumber(value) {
    this.valid = value.slice(0, -1);
    this.controlNumber = value.slice(-1);

    let sumNumber = 0;

    for (let i = 0; i < this.valid.length; i += 1) {
      let validNumber = parseInt(this.valid[i], 10);

      if ((this.valid.length) % 2 === 0) {
        if (i % 2 !== 0) {
          validNumber *= 2;
        }

        if (validNumber > 9) {
          validNumber -= 9;
        }
      } else if ((this.valid.length) % 2 !== 0) {
        if (i % 2 === 0) {
          validNumber *= 2;

          if (validNumber > 9) {
            validNumber -= 9;
          }
        }
      }

      sumNumber += validNumber;
    }

    sumNumber += Number(this.controlNumber);

    return sumNumber % 10 === 0;
  }

  validate(event) {
    event.preventDefault();
    const valueInput = event.target.closest('.card-number-label')
      .querySelector('.input-field').value;

    if (this.validNumber(valueInput)) {
      this.addValidNumber();
    } else {
      this.addInValidNumber();
    }
  }

  addValidNumber() {
    this.notification.classList.add('valid');
    this.notification.classList.remove('invalid');
    this.input.classList.add('valid');
    this.input.classList.remove('invalid');
    this.notification.innerHTML = 'Номер карты корректный';
  }

  addInValidNumber() {
    this.notification.classList.add('invalid');
    this.notification.classList.remove('valid');
    this.input.classList.add('invalid');
    this.input.classList.remove('valid');
    this.notification.innerHTML = 'Номер карты некорректный';
  }
}
