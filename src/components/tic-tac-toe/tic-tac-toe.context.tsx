import { createContext, useCallback, useEffect, useState } from "react";

import { DIMS, GAME_STATES, PLAYER_O, PLAYER_X } from "./constants";
import { GameBoard, Grid, Player, Winner } from "./game-board";
import { getRandomInt, minimax, switchPlayer } from "./utils";

const defaultSquares = new Array(DIMS ** 2).fill(null);

type GameMode = "single" | "double";

type Players = {
	player1: Player; // Only person
	player2: Player; // person | cpu
};

type TicTacToeContextType = {
	gameBoard: GameBoard;
	gameMode: GameMode;
	setGameMode: (mode: GameMode) => void;
	players: Players;
	squares: Grid;
	grid: Grid;
	winner: Winner | null;
	nextMove: Player;
	setNextMove: (next: Player) => void;
	gameState: GAME_STATES;
	setGameState: (state: GAME_STATES) => void;
	isGameOver: boolean;
	choosePlayer: (option: Player) => void;
	humanMove: (index: number) => void;
	resetGame: () => void;
	restartGame: () => void;
};

const defaultTicTacToeContextValue: TicTacToeContextType = {
	gameBoard: new GameBoard(),
	gameMode: "single",
	setGameMode: () => {},
	players: {
		player1: PLAYER_X,
		player2: PLAYER_O,
	},
	squares: defaultSquares,
	grid: defaultSquares,
	winner: null,
	nextMove: PLAYER_X,
	setNextMove: () => {},
	gameState: GAME_STATES.NOT_STARTED,
	setGameState: () => {},
	isGameOver: false,
	choosePlayer: () => {},
	humanMove: () => {},
	resetGame: () => {},
	restartGame: () => {},
};

export const TicTacToeContext = createContext<TicTacToeContextType>(
	defaultTicTacToeContextValue
);

interface TicTacToeContextProviderProps {
	squares?: Grid;
	children?: any;
}

const gameBoard = new GameBoard();

export const TicTacToeContextProvider = ({
	squares = defaultSquares,
	children,
}: TicTacToeContextProviderProps) => {
	const [gameMode, setGameMode] = useState<GameMode>("single");
	const [players, setPlayers] = useState<Players>({
		player1: PLAYER_X,
		player2: PLAYER_O,
	});
	const [grid, setGrid] = useState<Grid>(squares);
	const [winner, setWinner] = useState<Winner | null>(null);
	const [nextMove, setNextMove] = useState<Player>(PLAYER_X);
	const [gameState, setGameState] = useState<GAME_STATES>(
		GAME_STATES.NOT_STARTED
	);
	const [isGameOver, setIsGameOver] = useState<boolean>(false);

	useEffect(() => {
		const winner = gameBoard.getWinner(grid);

		if (winner !== null && gameState !== GAME_STATES.OVER) {
			setGameState(GAME_STATES.OVER);
			setWinner(winner);
			setTimeout(() => setIsGameOver(true), 500);
		}
	}, [gameState, grid, nextMove]);

	const move = useCallback(
		(index: number, player: Player) => {
			if (gameState === GAME_STATES.IN_PROGRESS) {
				setGrid((grid) => {
					const gridCopy = grid.concat();
					gridCopy[index] = player;

					return gridCopy;
				});
			}
		},
		[gameState]
	);

	const cpuMove = useCallback(() => {
		const cpuboard = new GameBoard(grid.concat());

		const index = cpuboard.isEmpty(grid)
			? getRandomInt(0, 8)
			: minimax(cpuboard, players.player2)[1];

		if (!grid[index]) {
			move(index, players.player2);
			setNextMove(players.player1);
		}
	}, [move, grid, players]);

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (
			gameMode === "single" &&
			nextMove === players.player2 &&
			gameState !== GAME_STATES.OVER
		) {
			timeout = setTimeout(() => {
				cpuMove();
			}, 500);
		}

		return () => timeout && clearTimeout(timeout);
	}, [nextMove, cpuMove, players.player2, gameState, gameMode]);

	const choosePlayer = (option: Player) => {
		setPlayers({ player1: option, player2: switchPlayer(option) });
		setGameState(GAME_STATES.IN_PROGRESS);
		setNextMove(PLAYER_X);
	};

	const humanMove = (index: number) => {
		if (!grid[index]) {
			if (nextMove === players.player1) {
				move(index, players.player1);
				setNextMove(players.player2);
			} else {
				move(index, players.player2);
				setNextMove(players.player1);
			}
		}
	};

	const restartGame = () => {
		setGameState(GAME_STATES.IN_PROGRESS);
		setGrid(defaultSquares);
		setIsGameOver(false);
		setNextMove(
			winner === players.player1 ? players.player2 : players.player1
		);
	};

	const resetGame = () => {
		setGameState(GAME_STATES.NOT_STARTED);
		setGrid(defaultSquares);
		setIsGameOver(false);
		setGameMode("single");
	};

	return (
		<TicTacToeContext.Provider
			value={{
				gameBoard,
				gameMode,
				setGameMode,
				squares,
				players,
				grid,
				winner,
				nextMove,
				setNextMove,
				gameState,
				setGameState,
				isGameOver,
				choosePlayer,
				humanMove,
				resetGame,
				restartGame,
			}}
		>
			{children}
		</TicTacToeContext.Provider>
	);
};
