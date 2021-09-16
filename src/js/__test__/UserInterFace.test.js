/**
 * @jest-environment jsdom
 */

import UserInterFace from '../UserInterFace';

test('checking userInterFace', () => {
  function checkingUserInterFace() {
    const userInterFace = new UserInterFace();
    userInterFace.bindToDOM(null);
  }
  expect(checkingUserInterFace).toThrowError(new Error('container is not HTMLElement'));
});
