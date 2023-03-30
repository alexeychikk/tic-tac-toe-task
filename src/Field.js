class Field {
	fieldSize;
	filledCells;
	scores;

	constructor(fieldSize) {
		this.fieldSize = fieldSize;
		this.filledCells = new Array(fieldSize * fieldSize).fill();
		this.scores = {
			X: new ScoreHolder(fieldSize),
			O: new ScoreHolder(fieldSize),
		};
	}

	fillPlayerScore(x, y, playerSign) {
		const playerScores = this.scores[playerSign];
		playerScores.fillAtXY(x, y);
		this.filledCells[x * this.fieldSize + y] = playerSign;
	}

	getRandomEmptyCellIndex() {
		const emptyCellIndexes = this.filledCells
			.map((sign, index) => (sign !== undefined ? undefined : index))
			.filter((value) => value !== undefined);
		const randomArrayIndex = _.random(0, emptyCellIndexes.length - 1);
		return emptyCellIndexes[randomArrayIndex];
	}

	convertCellIndexToXY(cellIndex) {
		return {
			x: Math.floor(cellIndex / this.fieldSize),
			y: cellIndex % this.fieldSize,
		};
	}
}
