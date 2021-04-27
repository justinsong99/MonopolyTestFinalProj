jest.mock('./monopoly-master1/monopoly')

const { addAlert } = require('./monopoly-master1/monopoly');
const { addamount, subtractamount } = jest.requireActual('./mocks/addsub');
const { Player } = jest.requireActual('./mocks/player');
const fs = require('fs');
window.document.body.innerHTML = fs.readFileSync("./monopoly-master1/index.html");

// addamount testing

beforeEach(() => {
    global.player = []
    global.turn = 0
    global.p1 = new Player("Player 1", "Yellow")
    player[turn] = p1
});

test('Test adding positive amount to a player', () => {
    expect(p1.money).toBe(1500)
    var cause = "random cause"
    var amt = 0
    addamount(amt, cause)
    expect(p1.money).toBe(1500)
    expect(addAlert).toHaveBeenCalledTimes(1);
})

test('Test adding positive amount to a player', () => {
    expect(p1.money).toBe(1500)
    var cause = "random cause"
    var amt = 100
    addamount(amt, cause)
    expect(p1.money).toBe(1600)
    expect(addAlert).toHaveBeenCalledTimes(2);
})

// FAILING TEST - FOUND A FAULT
// would expect an error thrown for negative addition
test('Test adding negative amount to a player', () => {
    expect(p1.money).toBe(1500)
    var cause = "random cause"
    var amt = -100
    expect(() => {
        addamount(amt, cause)
    }).toThrow();
})

// subtractamount testing

test('Test subtracting 0 amount from a player', () => {
    expect(p1.money).toBe(1500)
    var cause = "random cause"
    var amt = 0
    subtractamount(amt, cause)
    expect(p1.money).toBe(1500)
})

test('Test subtracting positive amount from a player', () => {
    expect(p1.money).toBe(1500)
    var cause = "random cause"
    var amt = 100
    subtractamount(amt, cause)
    expect(p1.money).toBe(1400)
})

// FAILING TEST - FOUND A FAULT
// would expect an error thrown for negative subtraction
test('Test subtracting negative amount from a player', () => {
    expect(p1.money).toBe(1500)
    var cause = "random cause"
    var amt = -100
    expect(() => {
        subtractamount(amt, cause)
    }).toThrow();
})





