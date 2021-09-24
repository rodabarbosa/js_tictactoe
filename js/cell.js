var Cell = (function () {
	function Cell(game, value) {
		const __cell = this;
		this.game = game;

		this.value = value === undefined ? null : value;

		this.valueElement = document.createElement("div");
		this.valueElement.className = "value-element";
		this.valueElement.innerHTML = value;
		this.valueElement.onclick = function () {
			__cell.clickEvent(__cell.getParent());
		}
	}

	Cell.prototype.getParent = function () {
		return this.game;
	}

	Cell.prototype.clickEvent = function (game) {
		//console.log(this);
		let player = game.getActivePlayer();
		this.setValue(player.getValue());
		game.changeTurn();
	}

	Cell.prototype.getValue = function () {
		return this.value;
	};

	Cell.prototype.setValue = function (value) {

		if (this.value) {
			throw new Error("Cell not empty.");
		}

		this.value = value;
		setValueToElement(this.value, this.valueElement);
	};

	Cell.prototype.show = function (board) {
		this.setValue(null);
		board.appendChild(this.valueElement);
	};

	Cell.prototype.reset = function () {
		this.value = null;
		setValueToElement(this.value, this.valueElement);
	}

	function setValueToElement(value, element) {
		element.innerHTML = value;
	}

	return Cell;
})();
