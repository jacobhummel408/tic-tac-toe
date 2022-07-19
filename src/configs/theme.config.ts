import { createTheme } from "@mui/material";

export const theme = createTheme({
	palette: {
		primary: {
			light: "#FFA922",
			main: "#FF8900",
			contrastText: "#ffffff",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 50,
					boxShadow: "none",
				},
			},
		},
	},
});
