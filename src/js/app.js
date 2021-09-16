import UserInterFace from './UserInterFace';

import DataValidation from './DataValidation';

const validation = new DataValidation();
const ui = new UserInterFace(validation);

ui.bindToDOM(document.querySelector('.validation-container'));

ui.init();
