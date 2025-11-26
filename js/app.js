let Cell = (function () {

	function Cell(index, clickEvent) {

		this.index = index === undefined ? null : index;
		this.clickEvent = clickEvent === undefined ? null : clickEvent;

		createElement(this);
		this.reset();
	}

	function createElement(cell) {
		cell.cellElement = document.createElement("div");
		cell.cellElement.id = `cell_${cell.index}`;
		cell.cellElement.onclick = cell.clickEvent;
	}

	function valueChanged(cell) {
		cell.cellElement.innerText = cell.getValue();
	}

	Cell.prototype.belongsToWinnerRow = function () {
		this.cellElement.className = 'cell winner';
	}

	Cell.prototype.reset = function () {
		this.value = null;
		this.cellElement.className = 'cell';
		valueChanged(this);
	}

	Cell.prototype.getValue = function () {
		return this.value;
	}

	Cell.prototype.setValue = function (value) {
		if (this.value) {
			throw new Error("Cell already filled");
		}

		this.value = value;
		valueChanged(this);
	}

	Cell.prototype.show = function (element) {
		element.appendChild(this.cellElement);
	}

	return Cell;
}());

let Player = (function () {

	function Player(name, value) {
		this.name = name;
		this.value = value;
	}

	Player.prototype.getValue = function () {
		return this.value;
	}

	Player.prototype.getName = function () {
		return this.name;
	}

	return Player;
}());

let Game = (function () {

	function Game(player1, player2) {
		this.players = [player1, player2];
		//this.playersTurn = 1;
	}

	function createSpace(game) {
		let title = document.createElement("h1");
		title.innerText = 'TIC TAC TOE';
		document.body.appendChild(title);

		game.board = document.createElement('div');
		game.board.className = "board";

		game.events = document.createElement('div');
		game.events.className = 'events';

		game.body = document.createElement('div');
		game.body.className = "board-events";

		game.body.appendChild(game.board);
		game.body.appendChild(game.events);

		document.body.appendChild(game.body);
	}

	function createCells(game) {

		game.cells = [];
		for (let i = 0; i < 9; i++) {

			if (i > 0 && i % 3 === 0) {
				let lineBreak = document.createElement("br");
				game.board.appendChild(lineBreak);
			}

			let cell = new Cell(i + 1, function () {
				clickEvent(game, cell);
			});
			cell.show(game.board);

			game.cells.push(cell);
		}
	}

	function clickEvent(game, cell) {
		try {
			let player = game.whosTurn();
			cell.setValue(player.getValue());
			game.registerEvent('Cell event', 'click');

			let winner = gameHasWinner(game);
			if (winner) {
				let message = `${winner.getName()} has won`;
				game.registerEvent('Game event', message);
				showModal(message, game);
				return;
			}

			if (hasGameEnded(game.cells)) {
				let message = 'GAME OVER';
				game.registerEvent('Game event', message);
				showModal(message, game);
				return;
			}

			game.changeTurn();
		} catch (error) {
			game.registerEvent('Cell event', error);
		}
	}

	function gameHasWinner(game) {
		let winnerValue = getWinnerValue(game.cells);
		if (!winnerValue) {
			return null;
		}

		let winnerIndex = game.players[0].getValue() === winnerValue ? 0 : 1;
		return game.players[winnerIndex];
	}

	function getWinnerValue(cells) {
		// Horizontals
		if (cells[0].getValue() && cells[0].getValue() === cells[1].getValue() && cells[1].getValue() === cells[2].getValue()) {
			checkWinnerRow(cells, [0, 1, 2]);
			return cells[0].getValue();
		}

		if (cells[3].getValue() && cells[3].getValue() === cells[4].getValue() && cells[4].getValue() === cells[5].getValue()) {
			checkWinnerRow(cells, [3, 4, 5]);
			return cells[3].getValue()
		}

		if (cells[6].getValue() && cells[6].getValue() === cells[7].getValue() && cells[7].getValue() === cells[8].getValue()) {
			checkWinnerRow(cells, [6, 7, 8]);
			return cells[6].getValue()
		}

		// Verticals
		if (cells[0].getValue() && cells[0].getValue() === cells[3].getValue() && cells[3].getValue() === cells[6].getValue()) {
			checkWinnerRow(cells, [0, 3, 6]);
			return cells[0].getValue();
		}

		if (cells[1].getValue() && cells[1].getValue() === cells[4].getValue() && cells[4].getValue() === cells[7].getValue()) {
			checkWinnerRow(cells, [1, 4, 7]);
			return cells[1].getValue();
		}

		if (cells[2].getValue() && cells[2].getValue() === cells[5].getValue() && cells[5].getValue() === cells[8].getValue()) {
			checkWinnerRow(cells, [2, 5, 8]);
			return cells[2].getValue();
		}

		// Diagonols
		if (cells[0].getValue() && cells[0].getValue() === cells[4].getValue() && cells[4].getValue() === cells[8].getValue()) {
			checkWinnerRow(cells, [0, 4, 8]);
			return cells[0].getValue();
		}

		if (cells[2].getValue() && cells[2].getValue() === cells[4].getValue() && cells[4].getValue() === cells[6].getValue()) {
			checkWinnerRow(cells, [2, 4, 6]);
			return cells[2].getValue();
		}

		return null;
	}

	function checkWinnerRow(cells, indexs) {
		indexs.forEach(i => {
			cells[i].belongsToWinnerRow();
		});
	}

	function hasGameEnded(cells) {

		for (let i = 0; i < cells.length; i++) {
			if (!cells[i].getValue()) {
				return false;
			}
		}

		return true;
	}

	Game.prototype.whosTurn = function () {
		return this.players[this.playersTurn];
	}

	Game.prototype.changeTurn = function () {
		this.playersTurn = this.playersTurn === 1 ? 0 : 1;
		let player = this.players[this.playersTurn];

		this.registerEvent('Change turn', `${player.getName()} turn`);
	}

	Game.prototype.registerEvent = function (eventName, message) {

		let name = document.createElement('strong');
		name.innerText = eventName;

		let msg = document.createElement('span');
		msg.style.marginLeft = '1rem';
		msg.innerText = message;

		let element = document.createElement("p");
		element.appendChild(name);
		element.appendChild(msg);

		this.events.prepend(element);
	}

	Game.prototype.run = function () {
		createSpace(this);
		createCells(this);

		startingMessage(this);
	}



	Game.prototype.reset = function () {
		this.events.innerText = null;

		removeModal();

		this.cells.forEach(cell => {
			cell.reset();
		});

		startingMessage(this);
	}

	function startingMessage(game) {
		game.registerEvent('starting', 'game starting');

		game.playersTurn = 1;
		game.changeTurn();
	}

	function showModal(message, game) {

		let p = document.createElement("p");
		p.innerText = message;

		let button = document.createElement("button");
		button.className = "modal-button";
		button.innerText = "RESTART";
		button.onclick = function () {
			game.reset();
		}

		let modal = document.createElement("div");
		modal.className = "modal";
		modal.appendChild(p);
		modal.appendChild(button);

		let background = document.createElement("div");
		background.className = "background-modal";
		background.appendChild(modal);

		document.body.appendChild(background);
	}

	function removeModal() {
		let message = document.getElementsByClassName('background-modal');
		for (let i = 0; i < message.length; i++) {
			let messageCell = message[i];
			messageCell.parentNode.removeChild(messageCell);
		}
	}

	return Game
}());

let player1 = new Player('Player 1', 'X');
let player2 = new Player('Player 2', 'O');
let game = new Game(player1, player2);
game.run();