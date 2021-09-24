var Player = (function () {
	function Player(name, value) {
		this.name = name;
		this.value = value;
	}

	Player.prototype.getName = function () {
		return this.name;
	};

	Player.prototype.getValue = function () {
		return this.value;
	};

	return Player;
})();
