class Game {
	field;
	turnCount;
	/**
	 * `playerSign` or "draw" or undefined
	 */
	winner;

	constructor(fieldSize) {
		this.field = new Field(fieldSize);
		this.turnCount = 0;
	}

	run() {
		this.drawField();
		this.registerEvents();
	}

	makeTurn(cellIndex, playerSign) {
		const { x, y } = this.field.convertCellIndexToXY(cellIndex);
		this.field.fillPlayerScore(x, y, playerSign);
		this.turnCount++;
		this.updateCell(cellIndex, playerSign);

		const winner = this.getWinner(x, y, playerSign);
		if (winner) {
			this.winner = winner;
			this.showWinner();
		}
	}

	getWinner(x, y, playerSign) {
		const playerScores = this.field.scores[playerSign];
		if (playerScores.isRowColOrDiagonalFilledAtXY(x, y)) {
			return playerSign;
		}
		if (this.turnCount === this.field.fieldSize * this.field.fieldSize) {
			return "draw";
		}
	}

	showWinner() {
		if (this.winner === undefined) {
			throw new Error("The game is still in progress!");
		}
		setTimeout(() => {
			alert(
				this.winner === "draw"
					? "It's a fucking draw, noob!"
					: `${this.winner} wins!`
			);
		}, 250);
	}

	drawField() {
		// Тут происходит генерация поля, пока не вдавайся в детали
		// хотя тут ничего сложного, если разобраться
		document.getElementById("app").innerHTML = `
      <div class="field"> 
        ${_.times(
					this.field.fieldSize,
					(i) => `
        <div class="row" id="row${i}">
          ${_.times(
						this.field.fieldSize,
						(j) =>
							`<div class="col" id="col${i * this.field.fieldSize + j}"></div>`
					).join("")}
        </div>`
				).join("")}
      </div>
      `;
	}

	registerEvents() {
		// Тут я беру каждую клетку и регистрирую событие чтобы
		// по нажатию ЛКМ по клетке выполнялась функция
		// тоже пока не вдавайся в детали
		_.times(this.field.fieldSize * this.field.fieldSize, (i) => {
			const cellEl = document.getElementById(`col${i}`);
			cellEl.onclick = () => this.handleCellClick(i, cellEl.dataset.fillSign);
		});
	}

	/**
	 * Эта функция заполняет клетку значением.
	 * Другими словами, если по нажатию на клетку ты хочешь,
	 * чтобы в неё поставился крестик, ты вызываешь fill(4, "X").
	 * На самом деле, ты туда можешь передать что угодно, хоть fill(0, "Z")
	 * и сделать вместо крестиков ноликов свою игру с "Y", "Z", блек джеком
	 * и шлюхами.
	 * @param {Number} cellIndex - это индекс клетки
	 * @param {String} sign - чем заполнить клетку, крестиком или ноликом
	 */
	updateCell(cellIndex, sign) {
		const cellEl = document.getElementById(`col${cellIndex}`);
		cellEl.classList.add("filled");
		cellEl.dataset.fillSign = sign;
		cellEl.innerHTML = `<div>${sign}</div>`;
	}

	/**
	 * @param {Number} cellIndex - это индекс клетки, от 0 до 8, если считать
	 * слева направо сверху вниз, то есть
	 * верхняя левая клетка 0,
	 * верхняя правая 2,
	 * нижняя левая 6,
	 * нижняя правая 8
	 * @param {String} fillSign - этот параметр показывает, что уже стоит
	 * в клетке - крестик или нолик или пусто. Если там крестик или нолик -
	 * то типом параметра должна быть строка "X" или "O", если пусто - undefined.
	 */
	handleCellClick(cellIndex, fillSign) {
		if (fillSign || this.winner) return;
		this.makeTurn(cellIndex, "X");
		if (this.winner) return;

		// Making AI turn
		const randomIndex = this.field.getRandomEmptyCellIndex();
		this.makeTurn(randomIndex, "O");
	}
}
