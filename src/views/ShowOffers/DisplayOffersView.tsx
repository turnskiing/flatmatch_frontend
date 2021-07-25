import OfferService from "../../services/OfferService"
import UserService from "../../services/UserService"
import React, { useContext, useEffect, useState } from "react"
import { OfferContext, UserContext } from "../../App"
import { DisplayOffersStyle } from "./DisplayOffers.style"
import { Grid } from "@material-ui/core"
import { ImageListType } from "react-images-uploading"
import { convertDataUrlToBlob } from "../../shared/convertDataUrlToBlob"
import { IHousingOffer } from "../../models/housingOffer"
import OfferCard from "../../components/OfferCard"
import { IReceivedImageMetaData } from "../../services/ProfileService"
import DefaultAppBar from "../../components/DefaultAppBar"
import { ShowOfferingBreadCrumb } from "../../components/Breadcrumbs"
import { useHistory } from "react-router-dom"


export default function DisplayOffersView() {
	const userContext = useContext(UserContext)
	const offerContext = useContext(OfferContext)
	const classes = DisplayOffersStyle()
	const [isLoading, setLoading] = useState<boolean>(false)
	const [offers, setOffers] = useState<IHousingOffer[]>([])
	const history = useHistory()

	useEffect(() => {
		setLoading(true)
		const fetchOffers = async () => {
			setOffers([])
			// Overwrite the local state with the response from the server
			const receivedOffers = await OfferService.getOffers(UserService.getCurrentUser()._id)

			for (const receivedOffer of receivedOffers) {
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
				const tempOffers = offers
				tempOffers.push(newOffer)
				setOffers(tempOffers)
			}
			setLoading(false)
		}
		fetchOffers()
		// eslint-disable-next-line
	}, [])

	return (
		<React.Fragment>
			{DefaultAppBar(userContext.user.first_name, ShowOfferingBreadCrumb(), "")}
			<div>
				<Grid container spacing={3} className={classes.gridContainer}
					justify={"center"}>
					{offers.map((offer) => (
						<Grid item xs={12} sm={6} md={4}>
							<OfferCard {...offer} />
						</Grid>
					))}
				</Grid>
			</div>
		</React.Fragment>
	)
}