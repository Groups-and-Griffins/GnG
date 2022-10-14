const helloGriffins = require('./helloGriffins')

test('displays the proper output', () => {
    expect(helloGriffins).toBeCalled(1)
})