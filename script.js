"use strict";

// class ScoreHolder {
// 	rows = {};
// 	cols = {};
// 	diagonals = {
// 		left: 0,
// 		right: 0,
// 	};
// 	fieldSize;

// 	constructor(fieldSize) {
// 		if (!fieldSize) {
// 			throw new Error("You must provide fieldSize");
// 		}
// 		this.fieldSize = fieldSize;
// 	}

// 	fillAtXY(x, y) {
// 		this.rows[x] = (this.rows[x] || 0) + 1;
// 		this.cols[y] = (this.cols[y] || 0) + 1;
// 		if (x === y) this.diagonals.left++;
// 		if (x + y === this.fieldSize - 1) this.diagonals.right++;
// 	}
// }

function ScoreHolder(fieldSize = 3) {
	this.rows = {};
	this.cols = {};
	this.diagonals = {
		left: 0,
		right: 0,
	};
	this.fieldSize = fieldSize;
}

ScoreHolder.prototype.fillAtXY = function (x, y) {
	this.rows[x] = (this.rows[x] || 0) + 1;
	this.cols[y] = (this.cols[y] || 0) + 1;
	if (x === y) this.diagonals.left++;
	if (x + y === this.fieldSize - 1) this.diagonals.right++;
};

class Student {
	constructor(studyHours = 4) {
		this.studyHours = studyHours;
	}

	study() {
		console.log(`Im studying ${this.studyHours} hours a day`);
	}
}

class SchoolStudent extends Student {
	studyHours = 6;
	amountOfMemorizedVerses = 100500;

	study() {
		super.study();
		console.log(`Then im going home`);
	}
}

class CollegeStudent extends Student {
	constructor({ studyHours, amountOfDrankAlcohol = 40 } = {}) {
		super(studyHours);
		this.amountOfDrankAlcohol = amountOfDrankAlcohol;
	}

	study() {
		console.log(`Im studying ${this.studyHours} hours a week!`);
		console.log(`Im drinking ${this.amountOfDrankAlcohol}g in an hour!`);
		// `this` in *arrow* function is `this` from parent function
		new Array(this.studyHours).fill().map((_, index) => {
			console.log(
				"drinking hour",
				index + 1,
				":",
				this.amountOfDrankAlcohol * (index + 1),
				"g"
			);
		});
	}
}

new Student(10).study();
console.log("---");
new SchoolStudent().study();
console.log("---");
const a = new CollegeStudent({ studyHours: 5, amountOfDrankAlcohol: 50 });
a.study();
