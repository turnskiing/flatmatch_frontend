import React, { useContext, useEffect, useState } from "react"
import { OfferContext, UserContext } from "../../App"
import ProfileService, { IReceivedImageMetaData } from "../../services/ProfileService"
import OfferService from "../../services/OfferService"
import DefaultAppBar from "../../components/DefaultAppBar"
import { ShowOfferingBreadCrumb } from "../../components/Breadcrumbs"
import { Box, CircularProgress, Paper } from "@material-ui/core"
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


export default function EditOfferView() {
	const userContext = useContext(UserContext)
	const offerContext = useContext(OfferContext)
	const [isEditable, setIsEditable] = React.useState(false)
	const classes = EditOfferStyle()
	const [isLoading, setLoading] = useState<boolean>(false)
	const [offerId, setOfferId] = useState<string>("")


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
			if (offerContext.offer._id)
				setOfferId(JSON.parse(window.localStorage.getItem('offerId') as string))
			else
				setOfferId(offerContext.offer._id)
			const receivedOffer = await OfferService.getOffer(offerId)

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
			window.localStorage.setItem("offerId", offerContext.offer._id)
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
						</React.Fragment>
					</Paper>
					<Copyright />
				</main>
			</div>
		</React.Fragment>
	)
}

