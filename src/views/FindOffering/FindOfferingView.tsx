import TinderCards from "./TinderCards"
import SwipeButtons from './SwipeButtons'
import React, { useContext } from "react"

// Context
import { OfferContext, UserContext } from "../../App"
import { useHistory } from "react-router-dom"
import UserService from "../../services/UserService"
import { AuthRoutes, NonAuthRoutes } from "../../Router"
// Styles
import grey from "@material-ui/core/colors/grey"


import { FindOfferingBreadCrumb } from "../../components/Breadcrumbs"
import DefaultAppBar from "../../components/DefaultAppBar"
import OfferService from "../../services/OfferService"


function FindOffering() {
	const userContext = useContext(UserContext)
	const offerContext = useContext(OfferContext)
	const history = useHistory()


	// const getOffers = async () => {
	// 	try {
	// 	} catch (response) {
	// 	}
	// }


	return (
		<React.Fragment>
			{DefaultAppBar(userContext.user.first_name, FindOfferingBreadCrumb(), "")}
			{/*<div>{getOffers()}</div>*/}
			<div className="app">
				<TinderCards />
				<SwipeButtons />
			</div>
		</React.Fragment>

	)
}

export default FindOffering