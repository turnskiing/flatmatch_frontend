import React, { useContext } from "react"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Chip from "@material-ui/core/Chip"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import AddIcon from "@material-ui/icons/Add"
// Context
import { UserContext } from "../../App"
// Models
import { IUser } from "../../models/user"
// Styles
import { InterestsStyles } from "./Interests.style"


export default function Interests(isEditable: boolean, termsOfService = true) {
	const classes = InterestsStyles()
	const userContext = useContext(UserContext)
	const [interest, setInterest] = React.useState("")

	const setBio = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newUser: IUser = {
			...userContext.user,
			bio: event.target.value,
		}
		userContext.setUser(newUser)
	}

	const setInterests = (newInterests: string[]) => {
		const newUser: IUser = {
			...userContext.user,
			interests: newInterests,
		}
		userContext.setUser(newUser)
	}

	const setAcceptedTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newUser: IUser = {
			...userContext.user,
			acceptedTerms: event.target.checked,
		}
		userContext.setUser(newUser)
	}

	const handleDelete = (interestToDelete: string) => () => {
		const newInsterests = userContext.user.interests
		setInterests(newInsterests.filter((existingInterest) => existingInterest !== interestToDelete))
	}

	const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
		setInterest(event.target.value)
	}

	const addInterest = () => {
		const interests = userContext.user.interests
		if (interest.trim() !== "" && interests.length < 6 && interests.filter(b => b === interest.trim()).length === 0) {
			const newInterests = interests

			newInterests.push(interest.trim())
			setInterest("")
			setInterests(newInterests)
		}
	}

	return (
		<React.Fragment>
			<Typography variant="h5" gutterBottom>
				Interests
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} className={classes.bio}>
					<Typography variant="h6" gutterBottom>
						Bio
					</Typography>
					<TextField
						id="bio"
						label="Describe yourself briefly (max 200 characters)"
						multiline
						fullWidth
						rows={4}
						inputProps={{
							maxLength: 200,
						}}
						variant="outlined"
						value={userContext.user.bio}
						onChange={setBio}
						disabled={!isEditable}
					/>
				</Grid>
				<Grid item xs={12} sm={5}>
					<Typography variant="h6" gutterBottom>
						What are you interested in?
					</Typography>
					<FormControl fullWidth className={classes.margin}>
						<InputLabel htmlFor="standard-adornment-interests">
							Interest *
						</InputLabel>
						<Input
							id="interests-textfield"
							value={interest}
							onChange={handleChange()}
							disabled={!isEditable}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="add interest"
										onClick={addInterest}
										disabled={!isEditable}
									>
										{<AddIcon />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={7}>
					<Paper component="ul" className={classes.root} elevation={0}>
						{userContext.user.interests.map((existingInterest) => {
							return (
								<li key={existingInterest} style={{ listStyle: "none" }}>
									<Chip
										label={existingInterest}
										variant="outlined"
										color="primary"
										onDelete={handleDelete(existingInterest)}
										disabled={!isEditable}
										className={classes.chip}
									/>
								</li>
							)
						})}
					</Paper>
				</Grid>
				{termsOfService && (
					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Checkbox
									color="primary"
									name="termsOfService"
									checked={userContext.user.acceptedTerms}
									onChange={setAcceptedTerms}
								/>
							}
							label="I accept the Terms of Service"
						/>
					</Grid>
				)}
			</Grid>
		</React.Fragment>
	)
}
