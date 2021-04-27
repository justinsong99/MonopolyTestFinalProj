jest.mock('./monopoly-master1/monopoly')

const { addAlert, updateOwned, updateMoney } = require('./monopoly-master1/monopoly');
const { streetrepairs, buyHouse, sellHouse } = jest.requireActual('./mocks/repairandhouse');
const { square } = jest.requireActual('./monopoly-master1/classicedition');
const { Player } = jest.requireActual('./mocks/player');
const fs = require('fs');
window.document.body.innerHTML = fs.readFileSync("./monopoly-master1/index.html");

// setup
beforeEach(() => {
    global.player = []
    global.turn = 1
    global.p1 = new Player("Player 1", "Yellow")
    player[1] = p1
    global.square = square
    global.sq = null
    global.p = null
});

// test streetrepairs

test('Test CC streetrepairs with no houses or hotels', () => {
    expect(p1.money).toBe(1500)
    streetrepairs(40, 115)
    expect(p1.money).toBe(1500)

    expect(addAlert).toHaveBeenCalledTimes(0);
})

test('Test CC streetrepairs with 3 houses and 2 hotels', () => {
    square[1].owner = turn
    square[1].hotel = 1
    square[37].owner = turn
    square[37].house = 3
    square[39].owner = turn
    square[39].hotel = 1

    expect(p1.money).toBe(1500)
    streetrepairs(40, 115)
    expect(p1.money).toBe(1150)

    expect(addAlert).toHaveBeenCalledTimes(1);

    square[1].owner = 0
    square[1].hotel = 0
    square[37].owner = 0
    square[37].house = 0
    square[39].owner = 0
    square[39].hotel = 0
})

test('Test chance streetrepairs with no houses or hotels', () => {
    expect(p1.money).toBe(1500)
    streetrepairs(25, 100)
    expect(p1.money).toBe(1500)

    expect(addAlert).toHaveBeenCalledTimes(1);
})

test('Test chance streetrepairs with 1 house and 1 hotel', () => {
    square[1].owner = turn
    square[1].house = 1

    square[39].owner = turn
    square[39].hotel = 1

    expect(p1.money).toBe(1500)
    streetrepairs(25, 100)
    expect(p1.money).toBe(1375)

    expect(addAlert).toHaveBeenCalledTimes(2);

    square[1].owner = 0
    square[1].house = 0
    square[39].owner = 0
    square[39].hotel = 0
})

// test buy house

test('Test buy house - cant afford it 1', () => {
    square[1].owner = 1
    p1.money = 40 // < 50
    square[1].house = 4

    var r = buyHouse(1)
    expect(r).toBe(false)
})

test('Test buy house - cant afford it 2', () => {
    square[1].owner = 1
    p1.money = 40 // < 50
    square[1].house = 3

    var r = buyHouse(1)
    expect(r).toBe(false)

    square[1].house = 0
})

// above 2 functions is a code fault - why have if else statement if both return false?

test('Test buy house - can afford - too many houses', () => {
    square[1].owner = 1

    square[3].house = 4
    square[6].house = 4
    square[8].house = 4
    square[9].house = 4
    square[11].house = 4
    square[13].house = 4
    square[14].house = 4
    square[16].house = 4


    var r = buyHouse(1)
    expect(r).toBe(false)

    square[3].house = 0
    square[6].house = 0
    square[8].house = 0
    square[9].house = 0
    square[11].house = 0
    square[13].house = 0
    square[14].house = 0
    square[16].house = 0
})

test('Test buy house - can afford - got house', () => {
    square[1].owner = 1

    expect(p1.money).toBe(1500)
    expect(square[1].house).toBe(0)
    buyHouse(1)
    expect(p1.money).toBe(1450)
    expect(square[1].house).toBe(1)

    expect(addAlert).toHaveBeenCalledTimes(3);
    expect(updateOwned).toHaveBeenCalledTimes(1);
    expect(updateMoney).toHaveBeenCalledTimes(4);
})

test('Test buy house - can afford - too many hotels', () => {
    square[1].owner = 1
    square[1].house = 4

    square[3].hotel = 1
    square[6].hotel = 1
    square[8].hotel = 1
    square[9].hotel = 1
    square[11].hotel = 1
    square[13].hotel = 1
    square[14].hotel = 1
    square[16].hotel = 1
    square[18].hotel = 1
    square[19].hotel = 1
    square[21].hotel = 1
    square[23].hotel = 1

    expect(p1.money).toBe(1500)
    buyHouse(1)
    expect(p1.money).toBe(1500)

    square[3].hotel = 0
    square[6].hotel = 0
    square[8].hotel = 0
    square[9].hotel = 0
    square[11].hotel = 0
    square[13].hotel = 0
    square[14].hotel = 0
    square[16].hotel = 0
    square[18].hotel = 0
    square[19].hotel = 0
    square[21].hotel = 0
    square[23].hotel = 0

    square[1].house = 0
})

test('Test buy house - can afford - got hotel', () => {
    square[1].owner = 1
    square[1].house = 4

    expect(p1.money).toBe(1500)
    expect(square[1].house).toBe(4)
    expect(square[1].hotel).toBe(0)
    buyHouse(1)
    expect(p1.money).toBe(1450)
    expect(square[1].house).toBe(5)
    expect(square[1].hotel).toBe(1)

    expect(addAlert).toHaveBeenCalledTimes(4);
    expect(updateOwned).toHaveBeenCalledTimes(2);
    expect(updateMoney).toHaveBeenCalledTimes(6);

    square[1].owner = 0
    square[1].house = 0
})

// test sell house

test('Test sell house - sold hotel', () => {
    square[1].owner = 1
    square[1].hotel = 1

    expect(p1.money).toBe(1500)
    expect(square[1].hotel).toBe(1)
    sellHouse(1)
    expect(p1.money).toBe(1525)
    expect(square[1].hotel).toBe(0)
    expect(square[1].house).toBe(4)

    expect(addAlert).toHaveBeenCalledTimes(5);
    expect(updateOwned).toHaveBeenCalledTimes(3);
    expect(updateMoney).toHaveBeenCalledTimes(7);
})

test('Test sell house - sold house', () => {
    square[1].owner = 1
    square[1].house = 3

    expect(p1.money).toBe(1500)
    sellHouse(1)
    expect(p1.money).toBe(1525)
    expect(square[1].house).toBe(2)

    expect(addAlert).toHaveBeenCalledTimes(6);
    expect(updateOwned).toHaveBeenCalledTimes(4);
    expect(updateMoney).toHaveBeenCalledTimes(8);
})