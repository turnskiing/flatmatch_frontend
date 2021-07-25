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
import { OfferContext } from "../../App"
// Models
import { IHousingOffer } from "../../models/housingOffer"
// Styles
import { ValuesStyle } from "./Values.style"
import Avatar from "@material-ui/core/Avatar"


export default function Values(isEditable: boolean, termsOfService: boolean) {
	const classes = ValuesStyle()
	const offerContext = useContext(OfferContext)
	const [value, setValue] = React.useState("")
	const [flatmate, setFlatmate] = React.useState("")

	const setValues = (newValues: string[]) => {
		const newOffer: IHousingOffer = {
			...offerContext.offer,
			values: newValues,
		}
		offerContext.setOffer(newOffer)
	}

	const setAcceptedTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newOffer: IHousingOffer = {
			...offerContext.offer,
			acceptedTerms: event.target.checked,
		}
		offerContext.setOffer(newOffer)
	}

	const setDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newOffering: IHousingOffer = {
			...offerContext.offer,
			description: event.target.value,
		}
		offerContext.setOffer(newOffering)
	}

	const handleDeleteValues = (valuesToDelete: string) => () => {
		const newValues = offerContext.offer.values
		setValues(newValues.filter((existingValue) => existingValue !== valuesToDelete))
	}

	const handleChangeValues = () => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	const addValue = () => {
		const values = offerContext.offer.values
		if (value.trim() !== "" && values.length < 6 && values.filter(b => b === value.trim()).length === 0) {
			const newValues = values

			newValues.push(value.trim())
			setValue("")
			setValues(newValues)
		}
	}

	const setFlatmates = (newFlatmates: string[]) => {
		const newOffer: IHousingOffer = {
			...offerContext.offer,
			flatmates: newFlatmates,
		}
		offerContext.setOffer(newOffer)
	}

	const handleDeleteFlatmates = (flatmatesToDelete: string) => () => {
		const newFlatmates = offerContext.offer.flatmates
		setFlatmates(newFlatmates.filter((existingValue) => existingValue !== flatmatesToDelete))
	}

	const handleChangeFlatmates = () => (event: React.ChangeEvent<HTMLInputElement>) => {
		setFlatmate(event.target.value)
	}

	const addFlatmate = () => {
		const flatmates = offerContext.offer.flatmates
		if (flatmate.trim() !== "" && flatmates.length < 6 && flatmates.filter(b => b === value.trim()).length === 0) {
			const newFlatmates = flatmates

			newFlatmates.push(value.trim())
			setFlatmate("")
			setFlatmates(newFlatmates)
		}
	}

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Values
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography variant="subtitle1" gutterBottom>
						Description
					</Typography>
					<TextField
						required
						id="description"
						label="Describe your living situation. What should applicants know about your living situation?"
						multiline
						fullWidth
						rows={6}
						inputProps={{
							maxLength: 600,
						}}
						defaultValue=""
						variant="outlined"
						value={offerContext.offer.description}
						onChange={setDescription}
						disabled={!isEditable}
					/>
				</Grid>
				<Grid item xs={12} sm={5}>
					<Typography variant="subtitle1" gutterBottom>
						What does your Flat value highly?
					</Typography>
					<Typography variant="subtitle2" gutterBottom>
						I. e. Cleanliness, Spending time together
					</Typography>
					<FormControl fullWidth className={classes.margin}>
						<InputLabel htmlFor="standard-adornment-values">
							Value *
						</InputLabel>
						<Input
							id="values-textfield"
							value={value}
							onChange={handleChangeValues()}
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									addValue()
								}
							}}
							disabled={!isEditable}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="add value"
										onClick={addValue}
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
						{offerContext.offer.values.map((existingValue) => {
							return (
								<li key={existingValue} style={{ listStyle: "none" }}>
									<Chip
										label={existingValue}
										variant="outlined"
										color="primary"
										onDelete={handleDeleteValues(existingValue)}
										disabled={!isEditable}
										className={classes.chip}
									/>
								</li>
							)
						})}
					</Paper>
				</Grid>
				<Grid item xs={12} sm={5}>
					<Typography variant="subtitle1" gutterBottom>
						Let your Applicants know, whom they will be living with!
					</Typography>
					<Typography variant="subtitle2" gutterBottom>
						Add profiles of your Flatmates
					</Typography>
					<FormControl fullWidth className={classes.margin}>
						<InputLabel htmlFor="standard-adornment-flatmates">
							Flatmates emails
						</InputLabel>
						<Input
							id="flatmate-textfield"
							value={flatmate}
							onChange={handleChangeFlatmates()}
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									addFlatmate()
								}
							}}
							disabled={!isEditable}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="add flatemate"
										onClick={addFlatmate}
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
						{offerContext.offer.flatmates.map((existingValue) => {
							return (
								<li key={existingValue} style={{ listStyle: "none" }}>
									<Chip
										label={existingValue}
										variant="outlined"
										color="primary"
										avatar={<Avatar src="../../images/avatar.png" />}
										onDelete={handleDeleteFlatmates(existingValue)}
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
									checked={offerContext.offer.acceptedTerms}
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
