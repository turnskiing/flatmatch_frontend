import TinderCards from "./TinderCards"
import SwipeButtons from './SwipeButtons'
/* tslint:disable */
import React, {useContext, useEffect, useState} from "react"
// Context
import {OffersContext, UserContext} from "../../App"
import {useHistory} from "react-router-dom"
import {FindOfferingBreadCrumb} from "../../components/Breadcrumbs"
import DefaultAppBar from "../../components/DefaultAppBar"
import OfferService, {IReceivedHousingOffer} from "../../services/OfferService"
import {defaultOffers, IHousingOffer} from "../../models/housingOffer";
import {CircularProgress} from "@material-ui/core";

import "./OfferingViewStyles.css"

// Styles

function FindOffering(this: any) {
    const userContext = useContext(UserContext)
    const offersContext = useContext(OffersContext)

    const history = useHistory()
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
                let newOffer: IHousingOffer = {
                    "id": offer._id,
                    "flatmates": offer.flatmates,
                    "images": [],
                    acceptedTerms: undefined,
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
                        latitude: offer.hasOwnProperty("latitude") ? offer.location.latitude : null,
                        longitude: offer.hasOwnProperty("longitude") ? offer.location.longitude : null,
                        distance: offer.hasOwnProperty("distance") ? offer.location.distance : null,
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
            <div className="app">
                {isLoading ? (
                    <div className={"loading_circle"}>
                        <CircularProgress color="secondary"/>
                    </div>
                ) : (
                    <TinderCards/>
                )}
                <SwipeButtons/>
            </div>
        </React.Fragment>

    )
}

export default FindOffering