
/* tslint:disable */

import React, { useContext, useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Grid from "@material-ui/core/Grid"
import { useTheme } from "@material-ui/core/styles"
import { RoommateDetailsViewStyle } from "./RoomMateDetailsView.style"
import Typography from "@material-ui/core/Typography"
import { CurrentOfferContext } from "./FindOfferingView"
import { ICurrentOffer } from "../../models/currentOffer"
import UserService, { IReceivedUser } from "../../services/UserService"
import ProfileService, { IReceivedImageMetaData } from "../../services/ProfileService"
import { defaultUser, IUser, UserType } from "../../models/user"
import { ImageListType } from "react-images-uploading"
import { convertDataUrlToBlob } from "../../shared/convertDataUrlToBlob"
import { Box, Chip, ImageList, ImageListItem, Paper, TextField } from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"
import ToggleButton from "@material-ui/lab/ToggleButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMars, faTransgenderAlt, faVenus } from "@fortawesome/free-solid-svg-icons"
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers"
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import OfferService, {IReceivedHousingOffer, IReceivedImage} from "../../services/OfferService"
import { defaultOffer, IHousingOffer } from "../../models/housingOffer"


export default function OfferDetailsView() {
	const currentOfferContext = useContext(CurrentOfferContext)
	const classes = RoommateDetailsViewStyle()
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))
	const [receivedOffer, setReceivedOffer] = useState(defaultOffer)

	useEffect(() => {
		let isSubscribed = true
		const fetchOffers = async () => {
			// Overwrite the local state with the response from the server
			try {
				if (currentOfferContext.currentOffer._id) {
					const newlyReceivedOffer: IReceivedHousingOffer = await OfferService.getOffer(currentOfferContext.currentOffer._id)
					const metaData: any = await OfferService.getOfferPicturesMetaData(newlyReceivedOffer._id || "")
					const receivedImages: ImageListType = []
					for (const data of metaData) {
						const receivedImage: IReceivedImage = await OfferService.getOfferPicture(data.fileName)
						const blob = convertDataUrlToBlob(receivedImage.file, receivedImage.mime)
						const objectURL = URL.createObjectURL(blob)
						const createdFile = new File([blob], data.fileName, { type: receivedImage.mime })
						receivedImages.push({
							dataURL: objectURL,
							file: createdFile
						})
					}

					if (isSubscribed) {
						const newOffer: any = {
							...newlyReceivedOffer,
							images: receivedImages,
						}
						setReceivedOffer(newOffer)
					}
				}
			} catch (error) {
				// tslint:disable-next-line:no-console
				console.log("Error when requesting user: " + error)
			}
		}
		fetchOffers()
		const changeSubscribed = () => {
			isSubscribed = false
		}
		// This prefents overriding the new with an old state when image takes long to load
		return () => changeSubscribed()
		// eslint-disable-next-line
	}, [currentOfferContext.currentOffer._id])


	const handleCancel = async () => {
		const newCurrentOffer: ICurrentOffer = {
			...currentOfferContext.currentOffer,
			isShown: false,
		}
		currentOfferContext.setCurrentOffer(newCurrentOffer)
	}

	const isLocationProvided = (): boolean => {
		return receivedOffer.location.country !== "" || receivedOffer.location.city !== ""
	}

	return (
		<React.Fragment>
			<Dialog
				fullScreen={fullScreen}
				open={currentOfferContext.currentOffer.isShown}
				onClose={handleCancel}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle
					id="form-dialog-title"
					className={classes.dialogBackground}
				>
					Details
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={3} justify="space-around" alignItems="center">
						<Grid item xs={12} sm={12} style={{ minHeight: 180 }}>
							<div className={classes.root}>
								<ImageList rowHeight={160} className={classes.imageList} cols={2.5}>
									{receivedOffer.images.map((image, index) => (
										<ImageListItem key={index}>
											<img src={image.dataURL} />
										</ImageListItem>
									))}
								</ImageList>
							</div>
						</Grid>
						<Grid item xs={12} sm={12}>
							<Typography variant="h5" gutterBottom>
								Personal Information
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								label="First name"
								fullWidth
								value={receivedOffer.title}
								disabled={true}
								className={classes.disabledInput}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								label="Last name"
								fullWidth
								value={receivedOffer.title}
								disabled={true}
								className={classes.disabledInput}
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
									value={receivedOffer.moveInDate}
									// tslint:disable-next-line:no-console
									onChange={(date: MaterialUiPickersDate) => console.log('datepicker')}
									KeyboardButtonProps={{
										"aria-label": "change date",
									}}
									disabled={true}
									className={classes.disabledInput}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						{/*<Grid item xs={12} sm={6} style={{marginTop: theme.spacing(2)}}>*/}
						{/*    <Typography color="textSecondary" component="span">*/}
						{/*        Gender {" "}*/}
						{/*    </Typography>*/}
						{/*    <ToggleButtonGroup*/}
						{/*        value={receivedOffer.gender}*/}
						{/*        size="medium"*/}
						{/*        exclusive*/}
						{/*        aria-label="select gender"*/}
						{/*    >*/}
						{/*        <ToggleButton*/}
						{/*            value="Female"*/}
						{/*            aria-label="female"*/}
						{/*            style={{padding: 15}}*/}
						{/*            disabled={true}*/}
						{/*        >*/}
						{/*            <FontAwesomeIcon icon={faVenus}/>*/}
						{/*        </ToggleButton>*/}
						{/*        <ToggleButton*/}
						{/*            value="Male"*/}
						{/*            aria-label="male"*/}
						{/*            style={{padding: 15}}*/}
						{/*            disabled={true}*/}
						{/*        >*/}
						{/*            <FontAwesomeIcon icon={faMars}/>*/}
						{/*        </ToggleButton>*/}
						{/*        <ToggleButton*/}
						{/*            value="Prefer not to say"*/}
						{/*            aria-label="Prefer not to say"*/}
						{/*            style={{padding: 15}}*/}
						{/*            disabled={true}*/}
						{/*        >*/}
						{/*            <FontAwesomeIcon icon={faTransgenderAlt}/>*/}
						{/*        </ToggleButton>*/}
						{/*    </ToggleButtonGroup>*/}
						{/*</Grid>*/}
						<Grid item xs={12} sm={6}>
							<TextField
								label="Occupation / Field of Study"
								fullWidth
								value={receivedOffer.title}
								disabled={true}
								className={classes.disabledInput}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								label="Smoker"
								fullWidth
								value={receivedOffer.smoking === true ? "Yes" : "No"}
								disabled={true}
								className={classes.disabledInput}
							/>
						</Grid>
						{isLocationProvided() && (
							<Grid item xs={12} sm={12} className={classes.place_of_residency}>
								<Typography variant="h6">
									Place of residency
								</Typography>
							</Grid>)}
						{isLocationProvided() && (
							<Grid item xs={12} sm={6}>
								<TextField
									id="country"
									name="country"
									label="Country"
									fullWidth
									value={receivedOffer.location.country || "Not provided"}
									disabled={true}
									className={classes.disabledInput}
								/>
							</Grid>)}
						{isLocationProvided() && (
							<Grid item xs={12} sm={6}>
								<TextField
									label="City"
									fullWidth
									value={receivedOffer.location.city || "Not provided"}
									disabled={true}
									className={classes.disabledInput}
								/>
							</Grid>)}
						{isLocationProvided() && (
							<Grid item xs={12} sm={6}>
								<TextField
									label="Zipcode"
									fullWidth
									value={receivedOffer.location.zipCode || "Not provided"}
									disabled={true}
									className={classes.disabledInput}
								/>
							</Grid>)}
						{isLocationProvided() && (
							// Used as spacer
							<Grid item xs={12} sm={6} />)}
						{receivedOffer.description.trim() && (
							<Grid item xs={12} className={classes.bio}>
								<Typography variant="h6" gutterBottom>
									Bio
								</Typography>
								<TextField
									id="bio"
									multiline
									fullWidth
									rows={4}
									inputProps={{
										maxLength: 200,
									}}
									variant="outlined"
									value={receivedOffer.description}
									disabled={true}
									className={classes.disabledInput}
								/>
							</Grid>)}
						<Grid item xs={12} sm={6}>
							<Typography variant="h6">
								Interests
							</Typography>
							<Paper component="ul" className={classes.chipRoot} elevation={0}>
								{receivedOffer.values.map((existingInterest) => {
									return (
										<li key={existingInterest} style={{ listStyle: "none" }}>
											<Chip
												label={existingInterest}
												variant="outlined"
												color="primary"
												disabled={false}
												className={classes.chip}
											/>
										</li>
									)
								})}
							</Paper>
						</Grid>
						<Grid item xs={12} sm={6} />
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancel} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	)
}
