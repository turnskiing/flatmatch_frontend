import TinderCards from "./TinderCards"
import SwipeButtons from './SwipeButtons'
import Header from "../../components/Header"


import React, { useContext } from "react"
import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import StepConnector from '@material-ui/core/StepConnector'

// Context
import { OfferContext, UserContext } from "../../App"
import { useHistory } from "react-router-dom"
import UserService from "../../services/UserService"
import { AuthRoutes, NonAuthRoutes } from "../../Router"
// Styles
import grey from "@material-ui/core/colors/grey"


import { FindOfferingBreadCrumb } from "../../components/Breadcrumbs"
import DefaultAppBar from "../../components/DefaultAppBar"
import OfferService from "../../services/OfferService";


function FindOffering() {
	const userContext = useContext(UserContext)
	const offerContext = useContext(OfferContext)
	const history = useHistory()


	const getOffers = async () => {
		try {
			await OfferService.getAllOffers()
		} catch (response) {
		}
	}


	return (
		<React.Fragment>
			{DefaultAppBar(userContext.user.first_name, FindOfferingBreadCrumb(), "")}
			<div>{getOffers()}</div>
			<div className="app">
				<TinderCards />
				<SwipeButtons />
			</div>
		</React.Fragment>

	)
}

export default FindOffering