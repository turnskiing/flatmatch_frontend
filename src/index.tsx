import React from "react"
import ReactDOM from "react-dom"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import App from "./App"

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#ff8f00", // This is an orange looking color
		},
		secondary: {
			main: "#ffcc80", // Another orange-ish color
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
