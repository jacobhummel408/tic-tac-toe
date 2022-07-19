import { DIMS, DRAW, PLAYER_X, PLAYER_O } from "./constants";

export type Cell = number | null;

export type Grid = Cell[];

export type Player = typeof PLAYER_X | typeof PLAYER_O;

export type Winner = Player | typeof DRAW;

export class GameBoard {
	grid: Grid = new Array(DIMS ** 2).fill(null);
	winningIndex: Cell = null;

	constructor(grid?: Grid) {
		this.grid = grid || new Array(DIMS ** 2).fill(null);
		this.winningIndex = null;
	}

	makeMove = (square: number, player: Player) => {
		if (this.grid[square] === null) {
			this.grid[square] = player;
		}
	};

	getEmptySquares = (grid = this.grid) => {
		let squares: number[] = [];

		grid.forEach((square: Cell, i: number) => {
			if (square === null) squares.push(i);
		});

		return squares;
	};

	isEmpty = (grid = this.grid) => {
		return this.getEmptySquares(grid).length === DIMS ** 2;
	};

	getWinner = (grid = this.grid): Winner | null => {
		const winningCombos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		let res: any = null;

		winningCombos.forEach((el, i) => {
			if (
				grid[el[0]] !== null &&
				grid[el[0]] === grid[el[1]] &&
				grid[el[0]] === grid[el[2]]
			) {
				res = grid[el[0]];
				this.winningIndex = i;
			} else if (
				res === null &&
				this.getEmptySquares(grid).length === 0
			) {
				res = DRAW;
				this.winningIndex = null;
			}
		});

		return res;
	};

	getStrikethroughStyles = () => {
		const defaultWidth = 285;
		const diagonalWidth = 400;

		switch (this.winningIndex) {
			case 0:
				return {
					transform: "none",
					top: 41,
					left: 15,
					width: defaultWidth,
				};

			case 1:
				return {
					transform: "none",
					top: 140,
					left: 15,
					width: defaultWidth,
				};

			case 2:
				return {
					transform: "none",
					top: 242,
					left: 15,
					width: defaultWidth,
				};

			case 3:
				return {
					transform: "rotate(90deg)",
					top: 145,
					left: -86,
					width: defaultWidth,
				};

			case 4:
				return {
					transform: "rotate(90deg)",
					top: 145,
					left: 15,
					width: defaultWidth,
				};

			case 5:
				return {
					transform: "rotate(90deg)",
					top: 145,
					left: 115,
					width: defaultWidth,
				};

			case 6:
				return {
					transform: "rotate(45deg)",
					top: 145,
					left: -44,
					width: diagonalWidth,
				};

			case 7:
				return {
					transform: "rotate(-45deg)",
					top: 145,
					left: -46,
					width: diagonalWidth,
				};

			default:
				return {};
		}
	};

	clone = () => {
		return new GameBoard(this.grid.concat());
	};
}
