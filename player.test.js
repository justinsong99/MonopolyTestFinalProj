jest.mock('./monopoly-master1/monopoly')

const { updateMoney } = require('./monopoly-master1/monopoly');
const { Player } = jest.requireActual('./mocks/player');
const fs = require('fs');
window.document.body.innerHTML = fs.readFileSync("./monopoly-master1/index.html");

// Player testing

test('Test default player values', () => {
    var p = new Player("Player 1", "Yellow");
    expect(p.name).toBe("Player 1")
    expect(p.color).toBe("Yellow")
    expect(p.money).toBe(1500)
    expect(p.position).toBe(0)
})

//Player pay function

test('Test valid pay', () => {
    var p = new Player("Player 1", "Yellow");
    expect(p.name).toBe("Player 1")
    expect(p.color).toBe("Yellow")
    expect(p.money).toBe(1500)
    expect(p.position).toBe(0)

    var r = p.pay(100, 2)

    expect(updateMoney).toHaveBeenCalledTimes(1);
    expect(p.money).toBe(1400)
    expect(r).toBe(true)
    /expect(p.creditor).toBe(-1)
})

test('Test pay with too much money', () => {
    var p = new Player("Player 2", "Blue");
    expect(p.name).toBe("Player 2")
    expect(p.color).toBe("Blue")
    expect(p.money).toBe(1500)
    expect(p.position).toBe(0)

    var r = p.pay(1600, 1)

    expect(updateMoney).toHaveBeenCalledTimes(2);
    expect(p.money).toBe(-100)
    expect(r).toBe(false)
    expect(p.creditor).toBe(1)
})