import React from "react";
import { Box } from "@mui/material";

import {
	TicTacToeContext,
	TicTacToeContextProvider,
} from "./tic-tac-toe.context";
import { GAME_STATES } from "./constants";
import { GameSettings } from "./game-settings";
import { GamePanel } from "./game-panel";
import { GameResult } from "./game-result";
import { GameControls } from "./game-controls";

export const TicTacToe = () => {
	return (
		<TicTacToeContextProvider>
			<TicTacToeContext.Consumer>
				{({ gameState, isGameOver }) =>
					gameState === GAME_STATES.NOT_STARTED ? (
						<GameSettings />
					) : (
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "flex-start",
								height: "100%",
								paddingTop: 20
							}}
						>
							<GamePanel />

							<GameControls />

							{isGameOver && <GameResult />}
						</Box>
					)
				}
			</TicTacToeContext.Consumer>
		</TicTacToeContextProvider>
	);
};
