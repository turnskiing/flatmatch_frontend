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
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
// Context
import { UserContext } from "../../App"
// Models
import { IUser } from "../../models/user"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			justifyContent: "center",
			flexWrap: "wrap",
			listStyle: "none",
			padding: theme.spacing(0.5),
			margin: 0,
		},
		chip: {
			margin: theme.spacing(0.5),
		},
		margin: {
			margin: theme.spacing(1),
		},
		withoutLabel: {
			marginTop: theme.spacing(3),
		},
	})
)

export default function Interests() {
	const classes = useStyles()
	const userContext = useContext(UserContext)
	const [interest, setInterest] = React.useState("")

	const setBio = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newUser: IUser = {
			...userContext.user,
			bio: event.target.value,
		}
		userContext.setUser(newUser)
	}

	const setInterests = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newUser: IUser = {
			...userContext.user,
			interests: [event.target.value],
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

	const [chipData, setChipData] = React.useState<string[]>([])

	const handleDelete = (chipToDelete: string) => () => {
		setChipData((chips) =>
			chips.filter((chip) => chip !== chipToDelete)
		)
	}

	const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
		setInterest(event.target.value)
	}

	const addInterest = () => {
		if (interest.trim() !== "" && chipData.length < 6 && chipData.filter(b => b === interest.trim()).length === 0) {
			const newchipData = chipData

			newchipData.push(interest.trim())
			setInterest("")
			setChipData(newchipData)
		}
	}

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
						inputProps={{
							maxLength: 200,
						}}
						defaultValue=""
						variant="outlined"
						value={userContext.user.bio}
						onChange={setBio}
					/>
				</Grid>
				<Grid item xs={12} sm={5}>
					<Typography variant="subtitle1" gutterBottom>
						What are you interested in?
					</Typography>
					<FormControl fullWidth className={classes.margin}>
						<InputLabel htmlFor="standard-adornment-interests">
							Interest
						</InputLabel>
						<Input
							id="interests-textfield"
							value={interest}
							onChange={handleChange()}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="add interest"
										onClick={addInterest}

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
						{chipData.map((data) => {
							return (
								<li key={data} style={{ listStyle: "none" }}>
									<Chip
										label={data}
										variant="outlined"
										color="primary"
										onDelete={handleDelete(data)}
										className={classes.chip}
									/>
								</li>
							)
						})}
					</Paper>
				</Grid>
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
			</Grid>
		</React.Fragment>
	)
}
