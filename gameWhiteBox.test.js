

/*describe('test1', function() {
	test('rollsDice is initialized to False upon game initialization', () => {
		window.onload = function() {
			const test_game = new Game();
			var test = test_game.areDiceRolled;
			alert(test);
		}
		window.onload();
	});
});*/

const { Game } = require('./monopoly');
const fs = require('fs');
window.document.body.innerHTML = fs.readFileSync("./index.html");

//Will test to see if the dice that are rolled are undefined (initial value) and then changed when the rollDice() function is called from the Game class
describe('testRollDiceFunction', function() {
	test('rollsDice is initialized to False upon game initialization', () => {
		var test_game = new Game();
		expect(test_game.getDie(1)).toBeUndefined()
		expect(test_game.getDie(2)).toBeUndefined()
		test_game.rollDice()
		expect(test_game.getDie(1)).toBeGreaterThan(0)
		expect(test_game.getDie(1)).toBeLessThan(7)
		expect(test_game.getDie(2)).toBeGreaterThan(0)
		expect(test_game.getDie(2)).toBeLessThan(7)
	});
});

//
