export default class UserInterFace {
  constructor(validation) {
    this.container = null;
    this.button = null;
    this.input = null;
    this.validation = validation;
    this.notification = null;
    this.checkInput = this.checkInput.bind(this);
    this.elem = null;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this.container = container;
  }

  init() {
    this.button = this.container.querySelector('.button');
    this.input = this.container.querySelector('.input-field');
    this.input.addEventListener('keydown', this.checkInput);
    this.input.addEventListener('keyup', (event) => this.validation.checkingThePaymentSystem(event));
    this.button.addEventListener('click', (event) => this.validation.validate(event));
    this.input.addEventListener('input', this.removeMaskInput);
    this.input.addEventListener('cut', this.removeMaskInput);
    this.input.addEventListener('input', this.changeInput);
  }

  checkInput(event) {
    this.elem = event;
    if (this.elem.key === 'Enter') {
      event.preventDefault();
    }

    if (this.elem.code === 'Space') {
      event.preventDefault();
    }
  }

  removeMaskInput(event) {
    const { value } = event.target;
    if (value === '') {
      this.cards = event.target.closest('.validation-container').querySelectorAll('.card');
      for (const card of [...this.cards]) {
        card.classList.remove('card-mask');
      }
    }
  }

  changeInput(event) {
    const { value } = event.target;
    if (value.length <= 2) {
      this.cards = event.target.closest('.validation-container').querySelectorAll('.card');
      for (const card of [...this.cards]) {
        card.classList.remove('card-mask');
      }
    }
    if (value.length === 0) {
      this.notification = event.target.closest('.validation-container').querySelector('.notification');
    }
  }
}
