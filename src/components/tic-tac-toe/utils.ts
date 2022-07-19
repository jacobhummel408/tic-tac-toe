import { PLAYER_O, PLAYER_X, SCORES } from "./constants";
import { GameBoard, Player } from "./game-board";

export const switchPlayer = (player: Player) => {
	return player === PLAYER_X ? PLAYER_O : PLAYER_X;
};

export const getRandomInt = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const minimax = (board: GameBoard, player: Player): [number, number] => {
	const mult = SCORES[player];

	let thisScore;
	let maxScore = -1;
	let bestMove = -1;

	const winner = board.getWinner();

	if (winner !== null) {
		return [SCORES[winner], 0];
	} else {
		for (let empty of board.getEmptySquares()) {
			let copy = board.clone();
			copy.makeMove(empty, player);
			thisScore = mult * minimax(copy, switchPlayer(player))[0];

			if (thisScore >= maxScore) {
				maxScore = thisScore;
				bestMove = empty;
			}
		}

		return [mult * maxScore, bestMove];
	}
};
