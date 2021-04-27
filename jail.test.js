jest.mock('./monopoly-master1/monopoly')

const { addAlert, updateMoney, updatePosition } = require('./monopoly-master1/monopoly');
const { payfifty, useJailCard } = jest.requireActual('./mocks/jail');
const { communityChestCards, chanceCards } = jest.requireActual('./monopoly-master1/classicedition');
const { Player } = jest.requireActual('./mocks/player');
const fs = require('fs');
window.document.body.innerHTML = fs.readFileSync("./monopoly-master1/index.html");

// setup
beforeEach(() => {
    global.player = []
    global.turn = 1
    global.p1 = new Player("Player 1", "Yellow")
    global.doublecount = 0
    player[1] = p1
    global.communityChestCards = communityChestCards
    global.chanceCards = chanceCards

    communityChestCards.index = 0;
    chanceCards.index = 0;

    communityChestCards.deck = [];
    chanceCards.deck = [];

    for (var i = 0; i < 16; i++) {
        chanceCards.deck[i] = i;
        communityChestCards.deck[i] = i;
    }
});

// test payfifty

test('Test payfifty to get out of jail', () => {
    p1.jail = true
    p1.jailroll = 3
    payfifty()

    expect(p1.jail).toBe(false)
    expect(p1.jailroll).toBe(0)
    expect(p1.money).toBe(1450)

    expect(addAlert).toHaveBeenCalledTimes(1);
    expect(updateMoney).toHaveBeenCalledTimes(2);
    expect(updatePosition).toHaveBeenCalledTimes(1);
})

// test useJailCard

test('Test use CC get out of jail card 1', () => {
    p1.jail = true
    p1.communityChestJailCard = true
    useJailCard()

    expect(p1.jail).toBe(false)
    expect(p1.jailroll).toBe(0)
    expect(p1.position).toBe(10)
    expect(p1.communityChestJailCard).toBe(false)
})

test('Test use CC get out of jail card 2', () => {
    communityChestCards.index = 16
    p1.jail = true
    p1.communityChestJailCard = true

    useJailCard()

    expect(p1.jail).toBe(false)
    expect(p1.jailroll).toBe(0)
    expect(p1.position).toBe(10)
    expect(p1.communityChestJailCard).toBe(false)
})

test('Test use chance get out of jail card 1', () => {
    p1.jail = true
    p1.chanceJailCard = true
    useJailCard()

    expect(p1.jail).toBe(false)
    expect(p1.jailroll).toBe(0)
    expect(p1.position).toBe(10)
    expect(p1.chanceJailCard).toBe(false)
})

test('Test use CC get out of jail card 2', () => {
    chanceCards.index = 16
    p1.jail = true
    p1.chanceJailCard = true

    useJailCard()

    expect(p1.jail).toBe(false)
    expect(p1.jailroll).toBe(0)
    expect(p1.position).toBe(10)
    expect(p1.chanceJailCard).toBe(false)
})