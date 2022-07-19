import React from "react";
import { Box, ThemeProvider } from "@mui/material";

import { TicTacToe } from "./components";
import { theme } from "./configs/theme.config";

export const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					display: "flex",
					width: "100%",
					height: "100vh",
					minHeight: 400,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<TicTacToe />
			</Box>
		</ThemeProvider>
	);
};
