import { useContext } from "react";

import { TicTacToeContext } from "./tic-tac-toe.context";

export const useTicTacToeContext = () => {
	return useContext(TicTacToeContext);
};
