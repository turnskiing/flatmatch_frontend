import React from "react"
import ReactDOM from "react-dom"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"
// colors
import orange from "@material-ui/core/colors/orange"

import App from "./App"

const theme = createMuiTheme({
	palette: {
		primary: {
			main: orange[600]
		},
		secondary: {
			main: orange[400]
		},
	},
})

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ThemeProvider>,
	document.getElementById("root")
)
