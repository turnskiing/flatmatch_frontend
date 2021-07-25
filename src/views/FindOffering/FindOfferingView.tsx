import TinderCards from "./TinderCards"
import SwipeButtons from './SwipeButtons'
/* tslint:disable */
import React, { createContext, useContext, useEffect, useState } from "react"
// Context
import { OffersContext, UserContext } from "../../App"
import { useHistory } from "react-router-dom"
import { FindOfferingBreadCrumb } from "../../components/Breadcrumbs"
import DefaultAppBar from "../../components/DefaultAppBar"
import OfferService, { IReceivedHousingOffer } from "../../services/OfferService"
import { defaultOffers, IHousingOffer } from "../../models/housingOffer";
import { CircularProgress } from "@material-ui/core";

import "./OfferingViewStyles.css"
import { defaultCurrentOffer, ICurrentOffer } from "../../models/currentOffer";
import { IReceivedImage, IReceivedImageMetaData } from "../../services/ProfileService";
import { convertDataUrlToBlob } from "../../shared/convertDataUrlToBlob";
import { ImageListType } from "react-images-uploading";

// Styles


interface ICurrentOfferContextProps {
	currentOffer: ICurrentOffer
	setCurrentOffer: React.Dispatch<React.SetStateAction<ICurrentOffer>>
}

export const CurrentOfferContext = createContext({} as ICurrentOfferContextProps)


function FindOffering(this: any) {
	const userContext = useContext(UserContext)
	const offersContext = useContext(OffersContext)
	const [currentOffer, setCurrentOffer] = useState(defaultCurrentOffer)

	const [isLoading, setLoading] = useState<boolean>(false)


	useEffect(() => {
		if (offersContext.offers !== defaultOffers) {
			setLoading(false)
			console.log(offersContext.offers)
		}
	}, [offersContext])

	// @ts-ignore
	useEffect(async () => {
		setLoading(true)
		const fetchUsers = async () => {
			const receivedOffers: Array<IReceivedHousingOffer> = await OfferService.getFilteredOffers()
			let offerList: IHousingOffer[] = []
			for (const offer of receivedOffers) {
				let receivedImages: ImageListType = []
				const metaData: [IReceivedImageMetaData] = await OfferService.getOfferPicturesMetaData(offer._id)
				if (metaData.length! > 0) {
					const receivedImage: IReceivedImage = await OfferService.getOfferPicture(metaData[0].fileName)
					const blob = convertDataUrlToBlob(receivedImage.file, receivedImage.mime)
					const objectURL = URL.createObjectURL(blob)
					const createdFile = new File([blob], metaData[0].fileName, { type: receivedImage.mime })
					receivedImages.push({
						dataURL: objectURL,
						file: createdFile
					})
				}
				let newOffer: IHousingOffer = {
					"_id": offer._id,
					"flatmates": offer.flatmates,
					"images": [receivedImages.map(a => a.dataURL)],
					"acceptedTerms": undefined,
					"values": offer.hasOwnProperty("values") ? offer.values : [],
					"tenant": offer.tenant,
					"price": {
						"currency": offer.price.currency,
						"amount": offer.price.amount
					},
					"location": {
						"country": offer.location.country,
						"city": offer.location.city,
						"zipCode": offer.location.zipCode,
						"address": offer.location.address,
						"latitude": offer.location.hasOwnProperty("latitude") ? offer.location.latitude : null,
						"longitude": offer.location.hasOwnProperty("longitude") ? offer.location.longitude : null,
						"distance": offer.hasOwnProperty("distanceToFilterLocation") ? offer.distanceToFilterLocation : null,
					},
					"description": offer.description,
					"roomSize": offer.roomSize,
					"yearConstructed": offer.hasOwnProperty("yearConstructed") ? offer.yearConstructed : null,
					"title": offer.title === null ? "404 title not found in record" : offer.title,
					"ageRange": {
						"minAge": offer.ageRange.minAge,
						"maxAge": offer.ageRange.maxAge
					},
					"moveInDate": offer.hasOwnProperty("moveInDate") ? offer.moveInDate : null,
					"furnished": offer.furnished,
					"numberOfRooms": offer.numberOfRooms,
					"smoking": offer.hasOwnProperty("moveInDate") ? offer.smoking : null,
				}
				offerList.push(newOffer)
			}
			offersContext.setOffers(offerList)
		}

		await fetchUsers()
		// eslint-disable-next-line
	}, [])


	// @ts-ignore
	return (
		<React.Fragment>
			{DefaultAppBar(userContext.user.first_name, FindOfferingBreadCrumb(), "")}
			<CurrentOfferContext.Provider value={{ currentOffer, setCurrentOffer }}>

				<div className="app">
					{isLoading ? (
						<div className={"loading_circle"}>
							<CircularProgress color="secondary" />
						</div>
					) : (
						<TinderCards />
					)}
				</div>
			</CurrentOfferContext.Provider>


		</React.Fragment>

	)
}

export default FindOffering