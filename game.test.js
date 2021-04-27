jest.mock('./monopoly-master1/monopoly')

const { play } = require('./monopoly-master1/monopoly');
const {square} = require('./monopoly-master1/classicedition')
const { roll } = require('./monopoly-master1/monopoly');
const { addAlert } = require('./monopoly-master1/monopoly')
const { popup } = require('./monopoly-master1/monopoly');
const { updateMoney } = require('./monopoly-master1/monopoly');
const { payDebt } = require('./monopoly-master1/ai')
const { Game } = jest.requireActual('./mocks/game');
const { Player } = jest.requireActual('./mocks/player');
const { Square } = require('./monopoly-master1/classicedition')


const fs = require('fs');
window.document.body.innerHTML = fs.readFileSync("./monopoly-master1/index.html");

// setup
beforeEach(() => {
	global.player = []
    global.p1 = new Player("JSong", "Yellow")
    player[4] = p1
    global.pcount = 0
    global.turn = 1
});

//Will test to see if default values of dice are undefined
describe('testRollDiceFunction1', function() {
	test('default values of dice are undefined', () => {
		var test_game = new Game()
		expect(test_game.getDie(1)).toBeUndefined()
		expect(test_game.getDie(2)).toBeUndefined()
	});
});

//Will test to see if the dice that are rolled are undefined (initial value) and then changed when the rollDice() function is called from the Game class
describe('testRollDiceFunction2', function() {
	test('rollsDice "rolls" a pair of dice and presents numbers that are random and between 1 and 6', () => {
		var test_game = new Game()
		expect(test_game.getDie(1)).toBeUndefined()
		expect(test_game.getDie(2)).toBeUndefined()
		test_game.rollDice()
		expect(test_game.getDie(1)).toBeGreaterThan(0)
		expect(test_game.getDie(1)).toBeLessThan(7)
		expect(test_game.getDie(2)).toBeGreaterThan(0)
		expect(test_game.getDie(2)).toBeLessThan(7)
	});
});

//testing next function
test('Testing game.next() function', () => {
    global.p = new Player("JSong", "Blue")
    var test_game = new Game()
   	test_game.setDiceRolledVal(true)
   	global.doublecount = 0
    test_game.next()
    expect(play).toHaveBeenCalledTimes(1)
    
})

//testing next function so that it will access roll
test('Testing game.next() function', () => {
    global.p = new Player("JSong", "Blue")
    var test_game = new Game()
    test_game.next()
    expect(play).toHaveBeenCalledTimes(1)
})

//testing to see if pushing property index to auction queue will work correctly
test('Testing pushing property index to auction queue', () => {
    global.p = new Player("JSong", "Blue")
    var test_game = new Game()
    test_game.auctionQueue = []
    expect(test_game.getAuctionQueueLength()).toBe(0)
    test_game.addPropertyToAuctionQueue(0)
    expect(test_game.getAuctionQueueLength()).toBe(1)
})

//testing auction as much as we can
test('Testing auction as much as possible pt1', () => {
	window.document.body.innerHTML = fs.readFileSync("./mocks/index_test.html");
    global.player = []
    global.player[1] = new Player("JSong", "Blue")
    var test_game = new Game()
    test_game.auctionQueue = []
    expect(test_game.getAuctionQueueLength()).toBe(0)
    test_game.addPropertyToAuctionQueue(1)
    global.square = []
    global.index = 0
    global.turn = 0
    global.pcount = 1
    global.currentbidder = 0
    global.game = new Game()
    var result = test_game.auction()
    expect(popup).toHaveBeenCalledTimes(1)
    expect(updateMoney).toHaveBeenCalledTimes(1)
    expect(result).toBe(true)
})

//Not testing auctionPass because it is mainl AI use

//testing auctionPass as much as we can
test('Testing auctionPass as much as possible pt1', () => {
	var test_game = new Game();
	window.document.body.innerHTML = fs.readFileSync("./mocks/index_test.html");
    global.player = []
    global.player[1] = new Player("JSong", "Blue")
    global.pcount = 1
    global.currentbidder = 1
    test_game.setHighestBidder(1)
    var result = test_game.auctionPass()
    
})

//Eliminating player test pcount = 4 and should access play()
test('Player elimination testing1', () => {
	 var test_game = new Game()
	 pcount = 4
	 global.p2 = new Player("Jose", "Blue")
	 global.p3 = new Player("Mike", "Red")
	 global.p4 = new Player("Alyssa", "Black")
	 player[1] = p2
	 player[2] = p3
	 player[3] = p4
	 test_game.eliminatePlayer()
	 expect(pcount).toBe(3)
	 expect(turn).toBe(0)
	 expect(play).toHaveBeenCalledTimes(3)
})

//Eliminating player test pcount = 3 and should access play()
test('Player elimination testing2', () => {
	 var test_game = new Game()
	 pcount = 3
	 global.p2 = new Player("Jose", "Blue")
	 global.p3 = new Player("Mike", "Red")
	 global.p4 = new Player("Alyssa", "Black")
	 player[1] = p2
	 player[2] = p3
	 player[3] = p4
	 test_game.eliminatePlayer()
	 expect(pcount).toBe(2)
	 expect(turn).toBe(0)
	 expect(play).toHaveBeenCalledTimes(4)
})

//Eliminating player test pcount = 2 and should access popup() and updateMoney()
test('Player elimination testing3', () => {
	 var test_game = new Game()
	 pcount = 2
	 global.p2 = new Player("Jose", "Blue")
	 global.p3 = new Player("Mike", "Red")
	 global.p4 = new Player("Alyssa", "Black")
	 player[1] = p2
	 player[2] = p3
	 player[3] = p4
	 test_game.eliminatePlayer()
	 expect(pcount).toBe(1)
	 expect(turn).toBe(0)
	 expect(play).toHaveBeenCalledTimes(4)
	 expect(popup).toHaveBeenCalledTimes(2)
	 expect(updateMoney).toHaveBeenCalledTimes(2)
})

//Bankruptcy Unmortgage testing, will not access if statement within for loop
test('bankruptcyUnmortgage testing, making sure that it unmortages correctly1', () => {
	 var test_game = new Game()
	 pcount = 3
	 global.p2 = new Player("Jose", "Blue")
	 global.p3 = new Player("Mike", "Red")
	 global.p4 = new Player("Alyssa", "Black")
	 player[1] = p2
	 player[2] = p3
	 player[3] = p4
	 player[1].creditor = 4
	 player[1].index = 1
	 global.sq = square[0]
	 global.game = new Game()
	 test_game.bankruptcyUnmortgage()
	 expect(popup).toHaveBeenCalledTimes(3)
})


//Bankruptcy Unmortgage testing
test('bankruptcyUnmortgage testing, making sure that it unmortages correctly2', () => {
	 var test_game = new Game()
	 pcount = 3
	 global.p2 = new Player("Jose", "Blue")
	 global.p3 = new Player("Mike", "Red")
	 global.p4 = new Player("Alyssa", "Black")
	 player[1] = p2
	 player[2] = p3
	 player[3] = p4
	 player[1].creditor = 4
	 player[1].index = 1
	 //manually setting some square owner to player 1
	 square[14].owner = 1
	 square[14].mortgage = true
	 square[32].owner = 1
	 square[32].mortgage = true
	 global.sq = square[0]
	 global.game = new Game()
	 test_game.bankruptcyUnmortgage()
	 expect(popup).toHaveBeenCalledTimes(4)
	 expect(square[14].owner).toBe(4)
	 expect(square[32].owner).toBe(4)
})

//Last branch access
//Bankruptcy Unmortgage testing
test('bankruptcyUnmortgage testing, making sure that it unmortages correctly3', () => {
	 var test_game = new Game()
	 pcount = 3
	 global.p2 = new Player("Jose", "Blue")
	 global.p3 = new Player("Mike", "Red")
	 global.p4 = new Player("Alyssa", "Black")
	 player[1] = p2
	 player[2] = p3
	 player[3] = p4
	 player[1].creditor = 4
	 player[1].index = 1
	 //manually setting some square owner to player 1
	 square[14].owner = 1
	 square[14].mortgage = true
	 square[32].owner = 1
	 square[32].mortgage = true
	 square[32].groupNumber = 1
	 global.sq = square[0]
	 global.game = new Game()
	 test_game.bankruptcyUnmortgage()
	 expect(popup).toHaveBeenCalledTimes(5)
	 expect(square[14].owner).toBe(4)
	 expect(square[32].owner).toBe(4)
})

//Resign function test
test('Resign testing, making sure that it resigns correctly', () => {
	 var test_game = new Game()
	 test_game.resign()
	 expect(popup).toHaveBeenCalledTimes(6)
})

//Testing bankruptcy method, not bankrupt player
test('bankruptcy testing, making sure that it bankrupts correctly pt1', () => {
	 var test_game = new Game()
	 global.p2 = new Player("Jose", "Blue")
	 global.p3 = new Player("Mike", "Red")
	 global.p4 = new Player("Alyssa", "Black")
	 player[1] = p2
	 player[2] = p3
	 player[3] = p4
	 player[1].creditor = 4
	 player[1].index = 1
	 player[1].money = 20
	 global.game = new Game()
	 test_game.bankruptcy()
	 //Does not change player 1 money because he/she is not bankrupt
	 expect(player[1].money).toBe(20)
})

//Testing bankruptcy method 1
test('bankruptcy testing, making sure that it bankrupts correctly pt2', () => {
	 var test_game = new Game()
	 global.p2 = new Player("Jose", "Blue")
	 global.p3 = new Player("Mike", "Red")
	 global.p4 = new Player("Alyssa", "Black")
	 player[1] = p2
	 player[2] = p3
	 player[3] = p4
	 player[1].creditor = 4
	 player[1].index = 1
	 player[1].money = -20
	 global.game = new Game()
	 test_game.bankruptcy()
	 //Does not change player 1 money because he/she is not bankrupt
	 expect(addAlert).toHaveBeenCalledTimes(1)
	 expect(updateMoney).toHaveBeenCalledTimes(3)
})


//Testing bankruptcy method 2
test('bankruptcy testing, making sure that it bankrupts correctly pt2', () => {
	 var test_game = new Game()
	 global.p2 = new Player("Jose", "Blue")
	 global.p3 = new Player("Mike", "Red")
	 global.p4 = new Player("Alyssa", "Black")
	 player[1] = p2
	 player[2] = p3
	 player[3] = p4
	 player[1].creditor = 4
	 player[1].chanceJailCard = true
	 player[1].index = 1
	 player[1].money = -20
	 global.game = new Game()
	 test_game.bankruptcy()
	 //Does not change player 1 money because he/she is not bankrupt
	 expect(addAlert).toHaveBeenCalledTimes(2)
	 expect(updateMoney).toHaveBeenCalledTimes(4)
	 expect(player[4].chanceJailCard).toBe(true)
})

//Testing bankruptcy method 3
test('bankruptcy testing, making sure that it bankrupts correctly pt2', () => {
	 var test_game = new Game()
	 global.p2 = new Player("Jose", "Blue")
	 global.p3 = new Player("Mike", "Red")
	 global.p4 = new Player("Alyssa", "Black")
	 player[1] = p2
	 player[2] = p3
	 player[3] = p4
	 player[1].creditor = 4
	 player[1].communityChestJailCard = true
	 player[1].index = 1
	 player[1].money = -20
	 global.game = new Game()
	 test_game.bankruptcy()
	 //Does not change player 1 money because he/she is not bankrupt
	 expect(addAlert).toHaveBeenCalledTimes(3)
	 expect(updateMoney).toHaveBeenCalledTimes(5)
	 expect(player[4].communityChestJailCard).toBe(true)
})

//Testing bankruptcy method 3
test('bankruptcy testing, making sure that it bankrupts correctly pt2', () => {
	 var test_game = new Game()
	 global.p2 = new Player("Jose", "Blue")
	 global.p3 = new Player("Mike", "Red")
	 global.p4 = new Player("Alyssa", "Black")
	 player[1] = p2
	 player[2] = p3
	 player[3] = p4
	 player[1].creditor = 4
	 player[1].index = 1
	 player[1].money = -20
	 //manually setting some square owner to player 1
	 square[14].owner = 1
	 square[14].mortgage = false
	 square[14].house = 0

	 global.game = new Game()
	 test_game.bankruptcy()
	 //Does not change player 1 money because he/she is not bankrupt
	 expect(addAlert).toHaveBeenCalledTimes(5)
	 expect(updateMoney).toHaveBeenCalledTimes(6)
	 expect(square[14].owner).toBe(4)
})

//Testing bankruptcy method 4
test('bankruptcy testing, making sure that it bankrupts correctly pt2', () => {
	 var test_game = new Game()
	 global.p2 = new Player("Jose", "Blue")
	 global.p3 = new Player("Mike", "Red")
	 global.p4 = new Player("Alyssa", "Black")
	 player[1] = p2
	 player[2] = p3
	 player[3] = p4
	 player[1].creditor = 4
	 player[1].index = 1
	 player[1].money = -20
	 //manually setting some square owner to player 1
	 square[14].owner = 1
	 square[14].mortgage = true
	 //more than 0 houses
	 square[14].house = 1

	 global.game = new Game()
	 var money_b4 = player[4].money
	 test_game.bankruptcy()
	 //Does not change player 1 money because he/she is not bankrupt
	 expect(addAlert).toHaveBeenCalledTimes(7)
	 expect(updateMoney).toHaveBeenCalledTimes(7)
	 expect(square[14].hotel).toBe(0)
	 expect(square[14].house).toBe(0)
	 expect(player[4].money).toBeGreaterThan(money_b4)
})

//Testing bankruptcy method 5
test('bankruptcy testing, making sure that it bankrupts correctly pt2', () => {
	 var test_game = new Game()
	 global.p2 = new Player("Jose", "Blue")
	 global.p3 = new Player("Mike", "Red")
	 global.p4 = new Player("Alyssa", "Black")
	 player[1] = p2
	 player[2] = p3
	 player[3] = p4
	 //player creditor is bank
	 player[1].creditor = 0
	 player[1].index = 1
	 player[1].money = -20
	 //manually setting some square owner to player 1
	 square[14].owner = 1
	 square[14].mortgage = true
	 square[14].house = 1

	 global.game = new Game()
	 test_game.bankruptcy()
	 //Does not change player 1 money because he/she is not bankrupt
	 expect(addAlert).toHaveBeenCalledTimes(8)
	 expect(updateMoney).toHaveBeenCalledTimes(8)
	 expect(square[14].owner).toBe(0)
	 expect(square[14].mortgage).toBe(false)
})



