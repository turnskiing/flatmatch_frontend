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
import { UserContext } from "../../App"
import { useHistory } from "react-router-dom"
import UserService from "../../services/UserService"
import { AuthRoutes, NonAuthRoutes } from "../../Router"
//Styles
import grey from "@material-ui/core/colors/grey"


import { FindOfferingBreadCrumb } from "../../components/Breadcrumbs"
import DefaultAppBar from "../../components/DefaultAppBar"


function FindOffering() {
	const userContext = useContext(UserContext)



	return (
		<React.Fragment>
			{DefaultAppBar(userContext.user.first_name, FindOfferingBreadCrumb(), "")}

			<div className="app">
				<Header title={""} />
				<TinderCards />
				<SwipeButtons />
				{/*Tinder Cards*/}
				{/*Buttons*/}
			</div>
		</React.Fragment>

	)
}

export default FindOffering