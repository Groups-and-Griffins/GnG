
const { add, mul, sub, div } = require('./op');

test('2 + 6 = 8', () => {
  expect(add(2, 6)).toBe(8);
});

test('4 * 4 = 16', () => {
  expect(mul(4, 4)).toBe(16);
});

test('5 - 6 = -1', () => {
  expect(sub(5, 6)).toBe(-1);
});

test('8 / 4 = 2', () => {
  expect(div(8, 4)).toBe(2);
});
