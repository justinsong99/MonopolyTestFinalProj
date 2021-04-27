jest.mock('./monopoly-master1/monopoly')

const { addAlert } = require('./monopoly-master1/monopoly');
const { payeachplayer, collectfromeachplayer } = jest.requireActual('./mocks/paycoleach');
const { Player } = jest.requireActual('./mocks/player');
const fs = require('fs');
window.document.body.innerHTML = fs.readFileSync("./monopoly-master1/index.html");

// setup
beforeEach(() => {
    global.player = []
    global.turn = 2
    global.p1 = new Player("Player 1", "Yellow")
    global.p2 = new Player("Player 2", "Blue")
    global.p3 = new Player("Player 3", "Green")
    global.doublecount = 0
    global.pcount = 3
    global.creditor = -1
    global.money = 0
    player[1] = p1
    player[2] = p2
    player[3] = p3
});

// test payeachplayer
// since payeachplayer is only ever called once all game from a chance card as payeachplayer(50, 'Chance') I will only test this
test('Test payeachplayer like chance card', () => {
    var cause = "Chance"
    var amt = 50
    payeachplayer(amt, cause)

    expect(p1.money).toBe(1550)
    expect(p2.money).toBe(1400)
    expect(p3.money).toBe(1550)

    expect(addAlert).toHaveBeenCalledTimes(1);
})

// test payeachplayer with amt that makes them go broke
test('Test payeachplayer like chance card 2 much', () => {
    var cause = "Chance"
    var amt = 1501
    payeachplayer(amt, cause)

    expect(p1.money).toBe(3001)
    expect(p2.money).toBe(-1502)
    expect(p3.money).toBe(3001)

    expect(addAlert).toHaveBeenCalledTimes(2);
})

// test collectfromeachplayer

test('Test collectfromeachplayer like community chest card', () => {
    var cause = 'Community Chest'
    var amt = 10
    collectfromeachplayer(amt, cause)

    expect(p1.money).toBe(1490)
    expect(p2.money).toBe(1520)
    expect(p3.money).toBe(1490)
})

test('Test collectfromeachplayer like community chest card 2 much', () => {
    var cause = 'Community Chest'
    var amt = 10
    p1.money = 5
    collectfromeachplayer(amt, cause)

    expect(p1.money).toBe(0)
    expect(p2.money).toBe(1515)
    expect(p3.money).toBe(1490)
})