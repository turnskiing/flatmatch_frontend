import React, { useContext, useEffect, useState } from "react"
import { OfferContext, UserContext } from "../../App"
import ProfileService, { IReceivedImageMetaData } from "../../services/ProfileService"
import OfferService from "../../services/OfferService"
import DefaultAppBar from "../../components/DefaultAppBar"
import { ShowOfferingBreadCrumb } from "../../components/Breadcrumbs"
import {
	Box, Button,
	CircularProgress, Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Paper
} from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import SaveIcon from "@material-ui/icons/Save"
import EditIcon from "@material-ui/icons/Edit"
import Grid from "@material-ui/core/Grid"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import { Copyright } from "../../components/Copyright"
import { EditOfferStyle } from "./EditOffer.style"
import OfferingInformation from "../CreateOffering/OfferingInformation"
import Values from "../CreateOffering/Values"
import { ImageListType } from "react-images-uploading"
import { convertDataUrlToBlob } from "../../shared/convertDataUrlToBlob"
import { IHousingOffer } from "../../models/housingOffer"
import DeleteIcon from "@material-ui/icons/Delete"
import { useHistory, useLocation } from "react-router-dom"
import { AuthRoutes } from "../../Router"


export default function EditOfferView() {
	const userContext = useContext(UserContext)
	const offerContext = useContext(OfferContext)
	const [isEditable, setIsEditable] = React.useState(false)
	const classes = EditOfferStyle()
	const [isLoading, setLoading] = useState<boolean>(false)
	const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
	const history = useHistory()
	const location = useLocation()
	const offerID: any = location.state


	const handleEdit = async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault()
		setIsEditable(!isEditable)
		// Execute only on save
		if (isEditable) {
			try {
				await OfferService.updateOffer(offerContext.offer)

				// Get MetaData of saved pictures
				const metaData = await OfferService.getOfferPicturesMetaData(offerContext.offer._id)
				// Delete all unused images
				metaData.map(async (image) => {
					const foundImages = offerContext.offer.images.filter(i => i.file?.name === image.fileName)
					if (foundImages.length === 0) {
						await ProfileService.deleteProfilePicture(image.fileName)
					}
				})

				offerContext.offer.images.map(async (image) => {
					// Upload all new images
					await OfferService.uploadOfferPicture(image.file, offerContext.offer._id)
				})
			} catch (response) {
				// tslint:disable-next-line:no-console
				console.log("Error when updating offer: " + response)
			}
		}
	}

	const handleDelete = async (event: React.MouseEvent<HTMLElement>) => {
		try {
			if (await OfferService.removeOffer(offerID)) {
				handleClose()
				history.push(AuthRoutes.home)
			}
		} catch (response) {
			// tslint:disable-next-line:no-console
			console.log("Error when deleting offer: " + response)
			handleClose()
		}
	}

	const handleClose = () => {
		setShowDeleteDialog(false)
	}

	const handleShowDeleteDialog = (event: React.MouseEvent<HTMLElement>) => {
		setShowDeleteDialog(true)
	}

	const isFormValid = (): boolean => {
		const offerCheck = offerContext.offer
		return offerCheck.title.trim() !== "" &&
			offerCheck.price !== null &&
			offerCheck.images.length > 0 &&
			offerCheck.location.country !== null &&
			offerCheck.location.city !== null &&
			offerCheck.location.zipCode !== null &&
			offerCheck.description.trim() !== "" &&
			offerCheck.roomSize !== null &&
			offerCheck.moveInDate !== null &&
			offerCheck.values.filter(b => b.trim() !== "").length !== 0
	}

	useEffect(() => {
		setLoading(true)
		const fetchOffer = async () => {
			// Overwrite the local state with the response from the server
			const receivedOffer = await OfferService.getOffer(offerID)
			const metaData: [IReceivedImageMetaData] = await OfferService.getOfferPicturesMetaData(receivedOffer._id)

			const receivedImages: ImageListType = []
			for (const data of metaData) {
				const receivedImage = await OfferService.getOfferPicture(data.fileName)
				const blob = convertDataUrlToBlob(receivedImage.file, receivedImage.mime)
				const objectURL = URL.createObjectURL(blob)
				const createdFile = new File([blob], data.fileName, { type: receivedImage.mime })
				receivedImages.push({
					dataURL: objectURL,
					file: createdFile
				})
			}
			const newOffer: IHousingOffer = {
				...receivedOffer,
				images: receivedImages,
				acceptedTerms: true,
				_id: receivedOffer._id
			}
			offerContext.setOffer(newOffer)
			setLoading(false)
		}
		fetchOffer()
		// eslint-disable-next-line
	}, [])

	return (
		<React.Fragment>
			{DefaultAppBar(userContext.user.first_name, ShowOfferingBreadCrumb(), "")}
			<div>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Box display="flex" justifyContent="flex-end">
							<IconButton
								onClick={handleEdit}
								disabled={isEditable ? !isFormValid() : false}
							>
								{isEditable ? <SaveIcon /> : <EditIcon />}
							</IconButton>
							<IconButton onClick={handleShowDeleteDialog}>
								<DeleteIcon />
							</IconButton>
						</Box>
						<React.Fragment>
							<Grid
								container
								spacing={3}
								direction="column"
								alignItems="center"
								justify="center"
							>
								{isLoading ? (
									<CircularProgress color="secondary" />
								) : (
									<Grid item xs={12}>
										<Avatar
											src={offerContext.offer.images[0] !== undefined ? offerContext.offer.images[0].dataURL : ""}
											className={classes.avatar}
										/>
									</Grid>
								)}
								<Grid item xs={12}>
									<Typography variant="h6">
										{offerContext.offer.title}
									</Typography>
								</Grid>
							</Grid>
							<Box style={{ padding: 15 }} />
							{OfferingInformation(isEditable)}
							<Box style={{ padding: 20 }} />
							{Values(isEditable, false)}
							<Box style={{ padding: 30 }} />
							<Dialog
								open={showDeleteDialog}
								onClose={handleClose}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<DialogTitle id="alert-dialog-title">{"Do you want to DELETE this offer?"}</DialogTitle>
								<DialogContent>
									<DialogContentText id="alert-dialog-description">
										Deleting the offer is permanent and can not be undone. Are you sure you want to delete it?
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleClose} color="primary">
										Cancel
									</Button>
									<Button onClick={handleDelete} color="primary" autoFocus>
										Delete
									</Button>
								</DialogActions>
							</Dialog>
						</React.Fragment>
					</Paper>
					<Copyright />
				</main>
			</div>
		</React.Fragment>
	)
}

