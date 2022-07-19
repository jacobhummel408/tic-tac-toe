import { Box, Typography } from "@mui/material";
import React from "react";

import { useTicTacToeContext } from "./hooks";

export const GameResult = () => {
	const { winner } = useTicTacToeContext();

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				paddingY: 4,
			}}
		>
			{winner ? (
				<>
					<Typography variant="subtitle1">Winner:</Typography>

					<Typography
						variant="h5"
						sx={{
							marginLeft: 4,
							color: (theme) => theme.palette.success.light,
						}}
					>
						Player {winner}
					</Typography>
				</>
			) : (
				<Typography
					variant="h5"
					sx={{
						marginLeft: 4,
						color: (theme) => theme.palette.warning.main,
					}}
				>
					It's draw!
				</Typography>
			)}
		</Box>
	);
};
