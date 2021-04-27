jest.mock('./monopoly-master1/monopoly')

const { addAlert, updatePosition, updateOwned, land } = require('./monopoly-master1/monopoly');
const { gotojail, gobackthreespaces } = jest.requireActual('./mocks/gofuncs');
const { Player } = jest.requireActual('./mocks/player');
const fs = require('fs');
window.document.body.innerHTML = fs.readFileSync("./monopoly-master1/index.html");

// setup
beforeEach(() => {
    global.player = []
    global.turn = 0
    global.p1 = new Player("Player 1", "Yellow")
    global.doublecount = 0
    player[turn] = p1
});

// gotojail testing
test('Test sending a player to jail - jail value', () => {
    expect(p1.jail).toBe(false)
    gotojail()
    expect(p1.jail).toBe(true)
    expect(doublecount).toBe(0)

    expect(addAlert).toHaveBeenCalledTimes(1);
    expect(updatePosition).toHaveBeenCalledTimes(1);
    expect(updateOwned).toHaveBeenCalledTimes(1);
})

// gobackthreespaces
// can only be from a chance card spot so from position 7, 22, or 36
test('Test sending a player back 3 spaces', () => {
    p1.position = 7
    expect(p1.position).toBe(7)
    gobackthreespaces()
    expect(p1.position).toBe(4)

    p1.position = 22
    expect(p1.position).toBe(22)
    gobackthreespaces()
    expect(p1.position).toBe(19)

    p1.position = 36
    expect(p1.position).toBe(36)
    gobackthreespaces()
    expect(p1.position).toBe(33)

    expect(land).toHaveBeenCalledTimes(3);
})

