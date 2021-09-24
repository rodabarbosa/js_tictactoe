var Game = (function () {

	function Game(player1, player2) {

		this.main = document.createElement('div');
		this.main.className = "game";
		document.body.appendChild(this.main);

		this.board = document.createElement("div");
		this.board.className = "board";
		this.main.appendChild(this.board);

		this.events = document.createElement('div');
		this.events.className = 'board-events';
		this.main.appendChild(this.events);

		this.players = [player1, player2];
		this.activePlayer = 0;

		this.cells = new Array();
		for (let i = 0; i < 9; i++) {
			let cell = new Cell(this);
			this.cells.push(cell);
		}
	}

	Game.prototype.getActivePlayer = function () {
		return this.players[this.activePlayer];
	};

	Game.prototype.changeTurn = function () {
		game.checkForWin();
		this.activePlayer = this.activePlayer === 0 ? 1 : 0;

		let player = this.players[this.activePlayer];
		this.registerAction(`Player ${player.getName()} turn.`);
	};

	Game.prototype.checkForWin = function () {
		let winnerValue = this.checkRows();
		if (winnerValue) {
			this.showWinner(this.players[this.activePlayer]);
			return;
		}

		if(this.hasGameEnded()) {
			this.gameover();
			return;
		}
	};

	Game.prototype.showWinner = function(player) {
		this.showModal(`WINNER ${player.getName()}`);
	}

	Game.prototype.gameover = function() {
		this.showModal('GAME OVER');
	}

	Game.prototype.showModal = function (msg) {
		this.registerAction(msg);

		let game = this;
		let p = document.createElement("p");
		p.innerText = msg;

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

	Game.prototype.hasGameEnded = function () {
		for (let i = 0; i < this.cells.length; i++) {
			if (!this.cells[i].getValue()) {
				return false;
			}
		}
		return true;
	}

	Game.prototype.checkRows = function () {
		/*
		 * Horizontals
		 */
		if (this.cells[0].getValue() == this.cells[1].getValue() &&
			this.cells[1].getValue() == this.cells[2].getValue() &&
			this.cells[2].getValue() == this.cells[0].getValue()) {
			return this.cells[0].getValue();
		}

		if (this.cells[3].getValue() == this.cells[4].getValue() &&
			this.cells[4].getValue() == this.cells[5].getValue() &&
			this.cells[5].getValue() == this.cells[3].getValue()) {
			return this.cells[3].getValue();
		}

		if (this.cells[6].getValue() == this.cells[7].getValue() &&
			this.cells[7].getValue() == this.cells[8].getValue() &&
			this.cells[8].getValue() == this.cells[6].getValue()) {
			return this.cells[6].getValue();
		}

		/*
		 * Verticals
		 */
		if (this.cells[0].getValue() == this.cells[3].getValue() &&
			this.cells[3].getValue() == this.cells[6].getValue() &&
			this.cells[6].getValue() == this.cells[0].getValue()) {
			return this.cells[0].getValue();
		}

		if (this.cells[1].getValue() == this.cells[4].getValue() &&
			this.cells[4].getValue() == this.cells[7].getValue() &&
			this.cells[7].getValue() == this.cells[1].getValue()) {
			return this.cells[1].getValue();
		}

		if (this.cells[2].getValue() == this.cells[5].getValue() &&
			this.cells[5].getValue() == this.cells[8].getValue() &&
			this.cells[8].getValue() == this.cells[2].getValue()) {
			return this.cells[2].getValue();
		}

		/*
		 * Diagonals
		 */
		if (this.cells[0].getValue() == this.cells[4].getValue() &&
			this.cells[4].getValue() == this.cells[8].getValue() &&
			this.cells[8].getValue() == this.cells[0].getValue()) {
			return this.cells[0].getValue();
		}

		if (this.cells[2].getValue() == this.cells[4].getValue() &&
			this.cells[4].getValue() == this.cells[6].getValue() &&
			this.cells[6].getValue() == this.cells[2].getValue()) {
			return this.cells[2].getValue();
		}


		return null;
	}

	Game.prototype.display = function () {
		this.registerAction('Game started');

		this.board.innerHTML = null;
		for (let i = 0; i < this.cells.length; i++) {
			if (i > 0 && i % 3 === 0) {
				this.board.appendChild(document.createElement("br"));
			}
			this.cells[i].show(this.board);
		}
	};

	Game.prototype.reset = function () {
		this.registerAction('reseting game.');

		for (let i = 0; i < this.cells.length; i++) {
			this.cells[i].reset();
		}

		let message = document.getElementsByClassName('background-modal');
		for (let i = 0; i < message.length; i++) {
			let messageCell = message[i];
			messageCell.parentNode.removeChild(messageCell);
		}
	}

	Game.prototype.registerAction = function (message, object) {
		if(object) {
			console.log(message, object);
		} else {
			console.log(message);
		}

		let event = document.createElement("p");
		event.innerHTML = message;

		this.events.appendChild(event);
	}

	return Game;
})();