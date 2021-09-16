/**
 * @jest-environment jsdom
 */

import DataValidation from '../DataValidation';

test.each([
  ['correct data entry', '4024007167653285', true],
  ['incorrect data entry', 'hello', false],
])('it should be %s', (_, input, expected) => {
  const dataValidation = new DataValidation();
  expect(dataValidation.validValue(input)).toBe(expected);
});

test.each([
  ['false when checking the input of the card number 1', '385648', false],
  ['false when checking the input of the card number 2', '402400716765328', false],
  ['true when checking the input of the card number 1', '4024007167653285', true],
  ['true when checking the input of the card number 2', '345024375842493', true],
])('it should be %s', (_, value, expected) => {
  const validate = new DataValidation();

  expect(validate.validNumber(value)).toBe(expected);
});

test.each([
  ['payment system check 1', '4024007197217166548', 'visa'],
  ['payment system check 2', '5183506201245689', 'masterCard'],
  ['payment system check 3', '371562843972290', 'american-express'],
  ['payment system check 4', '6011094251459274', 'discover'],
  ['payment system check 5', '3589572344019857', 'jcb'],
  ['payment system check 6', '36033175860922', 'diners'],
  ['payment system check 7', '2000000000000000', 'world'],
])('it should be %s', (_, value, expected) => {
  const validate = new DataValidation();

  expect(validate.checkingThePayment(value)).toBe(expected);
});
