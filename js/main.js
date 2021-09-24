/*
 * TIC TAC TOE

	IT'S A GAME PLAYED BY TWO PLAYERS;
	IT HAS FIELD SEEN AS 3 COLUMNS AND 3 ROWS;
	PLAYER MARKS THE EMPTY CELLS ONE AT TIME;
	PLAYERS MARKS ARE SHOWN AS Xs AND Os;
	WINS THE ONE THAT MARKS 3 CELLS MAKING A STRAIGHT LINE;
*/

let player1 = new Player("Player1", "X");
let player2 = new Player("Player2", "O");
let game = new Game(player1, player2);

game.display();
