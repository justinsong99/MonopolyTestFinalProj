jest.mock('./monopoly-master1/monopoly')

const { addAlert, land, updatePosition } = require('./monopoly-master1/monopoly');
const { advance, advanceToNearestUtility, advanceToNearestRailroad } = jest.requireActual('./mocks/advances');
const { Player } = jest.requireActual('./mocks/player');
const fs = require('fs');
window.document.body.innerHTML = fs.readFileSync("./monopoly-master1/index.html");

// setup
beforeEach(() => {
    global.player = []
    global.turn = 1
    global.p1 = new Player("Player 1", "Yellow")
    player[1] = p1
});

// test advance

test('Test advance without passing Go square', () => {
    p1.position = 1
    expect(p1.money).toBe(1500)

    advance(3)

    expect(p1.money).toBe(1500)
    expect(p1.position).toBe(3)

    expect(addAlert).toHaveBeenCalledTimes(0);
    expect(land).toHaveBeenCalledTimes(1);
})

test('Test advance with passing Go square', () => {
    p1.position = 3
    expect(p1.money).toBe(1500)

    advance(1)

    expect(p1.money).toBe(1700)
    expect(p1.position).toBe(1)

    expect(addAlert).toHaveBeenCalledTimes(1);
    expect(land).toHaveBeenCalledTimes(2);
})

// test advanceToNearestUtility

test('Test advanceToNearestUtility before Electric Company', () => {
    p1.position = 3
    advanceToNearestUtility()
    expect(p1.position).toBe(12)

    expect(land).toHaveBeenCalledTimes(3);
})

test('Test advanceToNearestUtility before Water Works', () => {
    p1.position = 13
    advanceToNearestUtility()
    expect(p1.position).toBe(28)

    expect(land).toHaveBeenCalledTimes(4);
})

// pass go!
test('Test advanceToNearestUtility after Water Works', () => {
    p1.position = 28
    expect(p1.money).toBe(1500)
    advanceToNearestUtility()
    expect(p1.position).toBe(12)
    expect(p1.money).toBe(1700)

    expect(land).toHaveBeenCalledTimes(5);
    expect(addAlert).toHaveBeenCalledTimes(2);
})

// test advanceToNearestRailroad

test('Test advanceToNearestRailroad before Pennsylvania Railroad', () => {
    p1.position = 7
    advanceToNearestRailroad()
    expect(p1.position).toBe(15)

    expect(land).toHaveBeenCalledTimes(6);
})

test('Test advanceToNearestRailroad before B&O Railroad', () => {
    p1.position = 22
    advanceToNearestRailroad()
    expect(p1.position).toBe(25)

    expect(land).toHaveBeenCalledTimes(7);
})

test('Test advanceToNearestRailroad after Short Line', () => {
    p1.position = 36
    expect(p1.money).toBe(1500)
    advanceToNearestRailroad()
    expect(p1.position).toBe(5)
    expect(p1.money).toBe(1700)

    expect(land).toHaveBeenCalledTimes(8);
    expect(addAlert).toHaveBeenCalledTimes(3);
})

