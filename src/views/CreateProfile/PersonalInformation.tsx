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
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers"
import ImageUploading, { ImageListType } from "react-images-uploading"
// Styles
import { CreateProfileStyles } from "./CreateProfile.style"
// Context
import { UserContext } from "../../App"
// Models
import { IUser } from "../../models/user"

export default function AddressForm() {
	const userContext = useContext(UserContext)
	const classes = CreateProfileStyles()
	const maxNumber = 5

	const setImages = (
		imageList: ImageListType,
		addUpdateIndex: number[] | undefined
	) => {
		const newUser: IUser = {
			...userContext.user,
			images: imageList as never[]
		}
		userContext.setUser(newUser)
	}

	const setDate = (date: Date | null) => {
		const newUser: IUser = {
			...userContext.user,
			date_of_birth: date
		}
		userContext.setUser(newUser)
	}

	const setGender = (
		event: React.MouseEvent<HTMLElement>,
		newGender: string | null
	) => {
		const newUser: IUser = {
			...userContext.user,
			gender: newGender
		}
		userContext.setUser(newUser)
	}

	const setUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newUser: IUser = {
			...userContext.user,
			full_name: event.target.value,
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

	const setPlaceOfResidency = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newUser: IUser = {
			...userContext.user,
			place_of_residency: event.target.value,
		}
		userContext.setUser(newUser)
	}

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Personal Information
			</Typography>
			<Grid container spacing={3}>
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
									{...dragProps}
								>
									Add Profile pictures
								</Button>
								{imageList.map((image, index) => (
									<div key={index} className="image-item">
										<img src={image.dataURL} alt="" width="150" />
										<div className="image-item__btn-wrapper">
											<IconButton
												className={classes.imageButtons}
												onClick={() => onImageUpdate(index)}
											>
												<SyncIcon />
											</IconButton>
											<IconButton
												className={classes.imageButtons}
												onClick={() => onImageRemove(index)}
											>
												<DeleteIcon />
											</IconButton>
										</div>
									</div>
								))}
							</div>
						)}
					</ImageUploading>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="fullName"
						name="fullName"
						label="Full name"
						fullWidth
						autoComplete="full-name"
						value={userContext.user.full_name}
						onChange={setUsername}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography color="textSecondary" component="span">
						Gender:{" "}
					</Typography>
					<ToggleButtonGroup
						value={userContext.user.gender}
						size="medium"
						exclusive
						onChange={setGender}
						aria-label="select gender"
					>
						<ToggleButton
							value="female"
							aria-label="female"
							style={{ padding: 15 }}
						>
							<FontAwesomeIcon icon={faVenus} />
						</ToggleButton>
						<ToggleButton
							value="male"
							aria-label="male"
							style={{ padding: 15 }}
						>
							<FontAwesomeIcon icon={faMars} />
						</ToggleButton>
						<ToggleButton
							value="PreferNotToSay"
							aria-label="Prefer not to say"
							style={{ padding: 15 }}
						>
							<FontAwesomeIcon icon={faTransgenderAlt} />
						</ToggleButton>
					</ToggleButtonGroup>
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
						/>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid item xs={12} sm={6}></Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="placeOfResidency"
						name="placeOfResidency"
						label="Place of Residency (Country, City, Zipcode)"
						fullWidth
						value={userContext.user.place_of_residency}
						onChange={setPlaceOfResidency}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="occupation"
						name="occupation"
						label="Occupation / Field of Study"
						fullWidth
						value={userContext.user.occupation}
						onChange={setOccupation}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}
