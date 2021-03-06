import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"

export function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				FlatMatch
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}