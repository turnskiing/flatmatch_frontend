import React from "react"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"

export default function Interests() {
	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Interests
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography variant="subtitle1" gutterBottom>
						Bio
					</Typography>
					<TextField
						id="bio"
						label="Describe yourself briefly (max 200 characters)"
						multiline
						fullWidth
						rows={4}
						defaultValue=""
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="subtitle1" gutterBottom>
						What are you interested in?
					</Typography>
					<TextField
						required
						id="Add-interests-icon-here"
						label="Add interests icon here"
						helperText="Add interests icon here"
						fullWidth
						autoComplete="cc-csc"
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox color="primary" name="termsOfService" value="yes" />
						}
						label="I accept the Terms of Service"
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}
