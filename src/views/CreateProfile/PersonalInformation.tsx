import "date-fns"
import React, { useContext } from "react"
import {
	faTransgenderAlt,
	faVenus,
	faMars,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import DeleteIcon from "@material-ui/icons/Delete"
import SyncIcon from "@material-ui/icons/Sync"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import ToggleButton from "@material-ui/lab/ToggleButton"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"
import DateFnsUtils from "@date-io/date-fns"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers"
import ImageUploading, { ImageListType } from "react-images-uploading"
// Styles
import { PersonalInformationStyles } from "./PersonalInfromation.style"
// Context
import { UserContext } from "../../App"
// Models
import { IUser, UserType } from "../../models/user"

export default function PersonalInformation(isEditable: boolean) {
	const userContext = useContext(UserContext)
	const classes = PersonalInformationStyles()
	const maxNumber = 6

	const setImages = (
		imageList: ImageListType,
		addUpdateIndex: number[] | undefined
	) => {
		const newUser: IUser = {
			...userContext.user,
			images: imageList as never[],
		}
		userContext.setUser(newUser)
	}

	const setDate = (date: Date | null) => {
		const newUser: IUser = {
			...userContext.user,
			date_of_birth: date,
		}
		userContext.setUser(newUser)
	}

	const setGender = (
		event: React.MouseEvent<HTMLElement>,
		newGender: string | null
	) => {
		const newUser: IUser = {
			...userContext.user,
			gender: newGender,
		}
		userContext.setUser(newUser)
	}

	const setFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newUser: IUser = {
			...userContext.user,
			first_name: event.target.value.trim(),
		}
		userContext.setUser(newUser)
	}

	const setLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newUser: IUser = {
			...userContext.user,
			last_name: event.target.value.trim(),
		}
		userContext.setUser(newUser)
	}

	const setOccupation = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newUser: IUser = {
			...userContext.user,
			occupation: event.target.value,
		}
		userContext.setUser(newUser)
	}

	const setCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newUser: IUser = {
			...userContext.user,
			place_of_residency: {
				country: event.target.value.trim(),
				city: userContext.user.place_of_residency.city,
				zipCode: userContext.user.place_of_residency.zipCode,
				address: userContext.user.place_of_residency.address,
			},
		}
		userContext.setUser(newUser)
	}

	const setCity = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newUser: IUser = {
			...userContext.user,
			place_of_residency: {
				country: userContext.user.place_of_residency.country,
				city: event.target.value.trim(),
				zipCode: userContext.user.place_of_residency.zipCode,
				address: userContext.user.place_of_residency.address,
			},
		}
		userContext.setUser(newUser)
	}

	const setZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newUser: IUser = {
			...userContext.user,
			place_of_residency: {
				country: userContext.user.place_of_residency.country,
				city: userContext.user.place_of_residency.city,
				zipCode: event.target.value.trim(),
				address: userContext.user.place_of_residency.address,
			},
		}
		userContext.setUser(newUser)
	}

	const setAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newUser: IUser = {
			...userContext.user,
			place_of_residency: {
				country: userContext.user.place_of_residency.country,
				city: userContext.user.place_of_residency.city,
				zipCode: userContext.user.place_of_residency.zipCode,
				address: event.target.value.trim(),
			},
		}
		userContext.setUser(newUser)
	}

	const setSmoker = (event: React.ChangeEvent<{ value: unknown }>) => {
		let isSmoker = false
		if ((event.target.value as string) === "Yes") {
			isSmoker = true
		}

		const newUser: IUser = {
			...userContext.user,
			smoker: isSmoker,
		}
		userContext.setUser(newUser)
	}

	return (
		<React.Fragment>
			<Typography variant="h5" gutterBottom>
				Personal Information
			</Typography>
			<Grid container spacing={3} justify="space-around" alignItems="center">
				<Grid item xs={12}>
					<ImageUploading
						multiple
						value={userContext.user.images}
						onChange={setImages}
						maxNumber={maxNumber}
					>
						{({
							imageList,
							onImageUpload,
							onImageRemoveAll,
							onImageUpdate,
							onImageRemove,
							dragProps,
						}) => (
							<div className="upload__image-wrapper">
								<Button
									className={classes.profileImage}
									variant="contained"
									startIcon={<AccountCircleIcon color="primary" />}
									onClick={onImageUpload}
									disabled={!isEditable}
									{...dragProps}
								>
									Add Profile pictures *
								</Button>
								<Grid container spacing={3} justify='center' alignItems="center" alignContent='space-around'>
									{imageList.map((image, index) => (
										<Grid item xs={12} sm={4} key={index}>
											<img src={image.dataURL} alt="" width="150" />
											<div className="image-item__btn-wrapper">
												<IconButton
													className={classes.imageButtons}
													onClick={() => onImageUpdate(index)}
													disabled={!isEditable}
												>
													<SyncIcon />
												</IconButton>
												<IconButton
													className={classes.imageButtons}
													onClick={() => onImageRemove(index)}
													disabled={!isEditable}
												>
													<DeleteIcon />
												</IconButton>
											</div>
										</Grid>
									))}
								</Grid>
							</div>
						)}
					</ImageUploading>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="firstName"
						name="firstName"
						label="First name"
						fullWidth
						autoComplete="first-name"
						value={userContext.user.first_name}
						onChange={setFirstName}
						disabled={!isEditable}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="lastName"
						name="lastName"
						label="Last name"
						fullWidth
						autoComplete="last-name"
						value={userContext.user.last_name}
						onChange={setLastName}
						disabled={!isEditable}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							margin="normal"
							id="dateOfBirth"
							name="dateOfBirth"
							label="Date of birth"
							format="MM/dd/yyyy"
							fullWidth
							required
							value={userContext.user.date_of_birth}
							onChange={setDate}
							KeyboardButtonProps={{
								"aria-label": "change date",
							}}
							disabled={!isEditable}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid item xs={12} sm={6} className={classes.gender}>
					<Typography color="textSecondary" component="span">
						Gender *{" "}
					</Typography>
					<ToggleButtonGroup
						value={userContext.user.gender}
						size="medium"
						exclusive
						onChange={setGender}
						aria-label="select gender"
					>
						<ToggleButton
							value="Female"
							aria-label="female"
							style={{ padding: 15 }}
							disabled={!isEditable}
						>
							<FontAwesomeIcon icon={faVenus} />
						</ToggleButton>
						<ToggleButton
							value="Male"
							aria-label="male"
							style={{ padding: 15 }}
							disabled={!isEditable}
						>
							<FontAwesomeIcon icon={faMars} />
						</ToggleButton>
						<ToggleButton
							value="Prefer not to say"
							aria-label="Prefer not to say"
							style={{ padding: 15 }}
							disabled={!isEditable}
						>
							<FontAwesomeIcon icon={faTransgenderAlt} />
						</ToggleButton>
					</ToggleButtonGroup>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="occupation"
						name="occupation"
						label="Occupation / Field of Study"
						fullWidth
						value={userContext.user.occupation}
						onChange={setOccupation}
						disabled={!isEditable}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					{userContext.user.type === UserType.Applicant && (
						<FormControl className={classes.choiceSelector}>
							<InputLabel id="select-smoker">Smoker *</InputLabel>
							<Select
								labelId="select-smoker"
								id="select-smoker"
								value={userContext.user.smoker === true ? "Yes" : "No"}
								onChange={setSmoker}
								disabled={!isEditable}
							>
								<MenuItem value={"Yes"}>Yes</MenuItem>
								<MenuItem value={"No"}>No</MenuItem>
							</Select>
						</FormControl>
					)}
				</Grid>
				<Grid item xs={12} sm={12} className={classes.place_of_residency}>
					<Typography variant="h6">
						What is your current place of residency?
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="country"
						name="country"
						label="Country"
						fullWidth
						value={userContext.user.place_of_residency.country}
						onChange={setCountry}
						disabled={!isEditable}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="city"
						name="city"
						label="City"
						fullWidth
						value={userContext.user.place_of_residency.city}
						onChange={setCity}
						disabled={!isEditable}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="zipcode"
						name="zipcode"
						label="Zipcode"
						fullWidth
						value={userContext.user.place_of_residency.zipCode}
						onChange={setZipcode}
						disabled={!isEditable}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="address"
						name="address"
						label="Address"
						fullWidth
						value={userContext.user.place_of_residency.address}
						onChange={setAddress}
						disabled={!isEditable}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}
