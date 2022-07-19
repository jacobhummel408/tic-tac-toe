import React from "react";
import { Box, Button } from "@mui/material";
import { useTicTacToeContext } from "./hooks";

export const GameControls = () => {
	const { restartGame, resetGame } = useTicTacToeContext();

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				paddingY: 8,
				width: "100%",
			}}
		>
			<Button
				variant="contained"
				size="large"
				onClick={() => restartGame()}
			>
				Restart
			</Button>

			<Button
				variant="contained"
				size="large"
				onClick={() => resetGame()}
				sx={{
					marginLeft: "auto",
				}}
			>
				Exit
			</Button>
		</Box>
	);
};
