import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { GAME_STATES, PLAYER_O, PLAYER_X } from "./constants";

import { useTicTacToeContext } from "./hooks";
import { CircleOutlined, Close } from "@mui/icons-material";

export const GameSettings = () => {
	const { setGameMode, choosePlayer, setGameState, setNextMove } =
		useTicTacToeContext();

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "flex-start",
				width: "100%",
				maxWidth: 640,
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					textAlign: "center",
					width: "50%",
				}}
			>
				<Button
					variant="contained"
					size="large"
					onClick={() => {
						setGameMode("single");
					}}
				>
					Player vs CPU
				</Button>

				<Box
					sx={{
						marginTop: 6,
					}}
				>
					<Typography variant="subtitle1" color="textSecondary">
						Select Player
					</Typography>

					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							marginTop: 2,
						}}
					>
						<IconButton
							onClick={() => choosePlayer(PLAYER_X)}
							size="large"
							color="primary"
						>
							<Close />
						</IconButton>

						<Typography
							variant="caption"
							color="textSecondary"
							sx={{
								paddingX: 4,
								lineHeight: 1,
							}}
						>
							VS
						</Typography>

						<IconButton
							onClick={() => choosePlayer(PLAYER_O)}
							size="large"
							color="secondary"
						>
							<CircleOutlined />
						</IconButton>
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					textAlign: "center",
					width: "50%",
				}}
			>
				<Button
					size="large"
					onClick={() => {
						setGameMode("double");
						setGameState(GAME_STATES.IN_PROGRESS);
						setNextMove(PLAYER_X);
					}}
				>
					Player vs Player
				</Button>
			</Box>
		</Box>
	);
};
