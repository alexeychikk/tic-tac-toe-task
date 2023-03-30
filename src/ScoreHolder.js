class ScoreHolder {
	rows = {};
	cols = {};
	diagonals = {
		left: 0,
		right: 0,
	};
	fieldSize;

	constructor(fieldSize) {
		if (!fieldSize) {
			throw new Error("You must provide fieldSize");
		}
		this.fieldSize = fieldSize;
	}

	fillAtXY(x, y) {
		this.rows[x] = (this.rows[x] || 0) + 1;
		this.cols[y] = (this.cols[y] || 0) + 1;
		if (x === y) this.diagonals.left++;
		if (x + y === this.fieldSize - 1) this.diagonals.right++;
	}

	isRowColOrDiagonalFilledAtXY(x, y) {
		return (
			this.rows[x] === this.fieldSize ||
			this.cols[y] === this.fieldSize ||
			this.diagonals.left === this.fieldSize ||
			this.diagonals.right === this.fieldSize
		);
	}
}
