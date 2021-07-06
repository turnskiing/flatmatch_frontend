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
import { Card, CardActionArea, CardContent, CardMedia } from "@material-ui/core"


export default function Interests() {
	const classes = ValuesStyle()
	const offerContext = useContext(OfferContext)
	const [value, setValue] = React.useState("")
	const [tenant, setTenant] = React.useState("")

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

	const setTenants = (newTenants: string[]) => {
		const newOffer: IHousingOffer = {
			...offerContext.offer,
			tenants: newTenants,
		}
		offerContext.setOffer(newOffer)
	}

	const handleDeleteTenants = (tenantsToDelete: string) => () => {
		const newTenants = offerContext.offer.tenants
		setTenants(newTenants.filter((existingValue) => existingValue !== tenantsToDelete))
	}

	const handleChangeTenants = () => (event: React.ChangeEvent<HTMLInputElement>) => {
		setTenant(event.target.value)
	}

	const addTenant = () => {
		const tennants = offerContext.offer.tenants
		if (tenant.trim() !== "" && tennants.length < 6 && tennants.filter(b => b === value.trim()).length === 0) {
			const newTenants = tennants

			newTenants.push(value.trim())
			setTenant("")
			setTenants(newTenants)
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
						id="description"
						label="Describe your living situation. What should applicants know about your living situation?"
						multiline
						fullWidth
						rows={4}
						inputProps={{
							maxLength: 400,
						}}
						defaultValue=""
						variant="outlined"
						value={offerContext.offer.description}
						onChange={setDescription}
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
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="add value"
										onClick={addValue}
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
						<InputLabel htmlFor="standard-adornment-tenants">
							Tenants emails  *
						</InputLabel>
						<Input
							id="tenants-textfield"
							value={tenant}
							onChange={handleChangeTenants()}
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									addTenant()
								}
							}}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="add tenant"
										onClick={addTenant}

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
						{offerContext.offer.tenants.map((existingValue) => {
							return (
								<li key={existingValue} style={{ listStyle: "none" }}>
									{/*<Card className={classes.cards}>
                                        <CardActionArea>
                                            <CardMedia
                                                image="src/images/avatar.png"
                                                title="Profile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {existingValue}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Username lives in this appartment
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>*/}
									<Chip
										label={existingValue}
										variant="outlined"
										color="primary"
										avatar={<Avatar src="../../images/avatar.png" />}
										onDelete={handleDeleteTenants(existingValue)}
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
								checked={offerContext.offer.acceptedTerms}
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
