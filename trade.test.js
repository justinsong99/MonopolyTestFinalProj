const { Player, Trade } = require('./monopoly-master1/monopoly');

// Trade testing

test('Test trade getInitiator', () => {
    var p1 = new Player("Player 1", "Yellow");
    var p2 = new Player("Player 2", "Blue");
    var properties = new Array(40).fill(0)
    properties[1] = 1
    var t = new Trade(p1, p2, 100, properties, 0, 0);

    expect(t.getInitiator()).toBe(p1)
    expect(t.getInitiator().money).toBe(1500)

    expect(t.getRecipient()).toBe(p2)
    expect(t.getRecipient().color).toBe("Blue")

    expect(t.getProperty(1)).toBe(1)
    expect(t.getProperty(39)).toBe(0)

    expect(t.getMoney()).toBe(100)

    expect(t.getCommunityChestJailCard()).toBe(0)

    expect(t.getChanceJailCard()).toBe(0)
})