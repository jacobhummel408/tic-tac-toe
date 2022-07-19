import React from "react";
import { Box, ButtonBase } from "@mui/material";

import { DIMS, PLAYER_X, SQUARE_DIMS } from "./constants";
import { useTicTacToeContext } from "./hooks";
import { CircleOutlined, Close } from "@mui/icons-material";

export const GamePanel = () => {
	const { grid, humanMove, isGameOver, gameBoard } = useTicTacToeContext();

	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				alignItems: "center",
				justifyContent: "center",
				width: DIMS * (SQUARE_DIMS + 5),
				position: "relative",
			}}
		>
			{grid.map((value, index) => {
				const isActive = value !== null;

				return (
					<ButtonBase
						key={index}
						onClick={() => humanMove(index)}
						sx={{
							margin: 0.2,
							border: (theme) =>
								`1px solid ${theme.palette.divider}`,
							width: SQUARE_DIMS,
							height: SQUARE_DIMS,
							borderRadius: 4,
						}}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							{isActive && (
								<>
									{value === PLAYER_X ? (
										<Close
											sx={{
												fontSize: 32,
												color: (theme) =>
													theme.palette.primary.main,
											}}
										/>
									) : (
										<CircleOutlined
											sx={{
												fontSize: 32,
												color: (theme) =>
													theme.palette.secondary
														.main,
											}}
										/>
									)}
								</>
							)}
						</Box>
					</ButtonBase>
				);
			})}

			{isGameOver && (
				<Box
					sx={{
						display: "flex",
						position: "absolute",
						bgcolor: (theme) => theme.palette.error.main,
						height: 4,
						...gameBoard.getStrikethroughStyles(),
					}}
				/>
			)}
		</Box>
	);
};
