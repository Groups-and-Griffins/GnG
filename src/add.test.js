const add = require('./add');

test('displays the proper output', () => {
    expect(add(5,3)).toBe(8);
});