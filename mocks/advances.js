const {addAlert, land, updatePosition} = require('../monopoly-master1/monopoly')

function advance(destination, pass) {
	var p = player[turn];

	if (typeof pass === "number") {
		if (p.position < pass) {
			p.position = pass;
		} else {
			p.position = pass;
			p.money += 200;
			addAlert(p.name + " collected a $200 salary for passing GO.");
		}
	}
	if (p.position < destination) {
		p.position = destination;
	} else {
		p.position = destination;
		p.money += 200;
		addAlert(p.name + " collected a $200 salary for passing GO.");
	}

	land();
}

function advanceToNearestUtility() {
	var p = player[turn];

	if (p.position < 12) {
		p.position = 12;
	} else if (p.position >= 12 && p.position < 28) {
		p.position = 28;
	} else if (p.position >= 28) {
		p.position = 12;
		p.money += 200;
		addAlert(p.name + " collected a $200 salary for passing GO.");
	}

	land(true);
}

function advanceToNearestRailroad() {
	var p = player[turn];

	updatePosition();

	if (p.position < 15) {
		p.position = 15;
	} else if (p.position >= 15 && p.position < 25) {
		p.position = 25;
	} else if (p.position >= 35) {
		p.position = 5;
		p.money += 200;
		addAlert(p.name + " collected a $200 salary for passing GO.");
	}

	land(true);
}

exports.advance = advance
exports.advanceToNearestRailroad = advanceToNearestRailroad
exports.advanceToNearestUtility = advanceToNearestUtility