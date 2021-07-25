import React, { useContext } from "react"
import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import StepConnector from '@material-ui/core/StepConnector'
// Steps
import OfferingInformation from "./OfferingInformation"
import Values from "./Values"
// Components
import { Copyright } from "../../components/Copyright"
import { CreateOfferingBreadCrumb } from "../../components/Breadcrumbs"
import DefaultAppBar from "../../components/DefaultAppBar"
// Styles
import { CreateOfferingStyles } from "./CreateOfferingView.style."
import { withStyles } from '@material-ui/core/styles'
import grey from "@material-ui/core/colors/grey"
// Context
import { OfferContext } from "../../App"
import { useHistory } from "react-router-dom"
import { AuthRoutes, NonAuthRoutes } from "../../Router"
import OfferService, { IReceivedHousingOffer } from "../../services/OfferService"

const steps = ["Offering information", "Values"]

const ColorStepConnector = withStyles((theme) => ({
	active: {
		'& $line': {
			borderColor: theme.palette.primary.main,
		},
	},
	completed: {
		'& $line': {
			borderColor: theme.palette.primary.main,
		},
	},
	line: {
		borderColor: grey[300],
		borderTopWidth: 3,
		borderRadius: 1,
	},
}))(StepConnector)

function getStepContent(step: number) {
	switch (step) {
		case 0:
			return <OfferingInformation {...true} />
		case 1:
			return <Values {...true} />
		default:
			throw new Error("Unknown step")
	}
}

interface IContextProps {
	activeStep: number
	setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

export const CreateOfferingStepContext = React.createContext({} as IContextProps)

export default function CreateOfferingView() {
	const offerContext = useContext(OfferContext)
	const history = useHistory()
	const classes = CreateOfferingStyles()
	const [activeStep, setActiveStep] = React.useState(0)

	const handleNext = () => {
		setActiveStep(activeStep + 1)
	}

	const handleBack = () => {
		setActiveStep(activeStep - 1)
	}

	const handleCreateOffer = async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault()
		try {
			const newOffer: IReceivedHousingOffer = await OfferService.createOffer(offerContext.offer)
			offerContext.offer.images.map(async (image) => {
				// Upload new images
				OfferService.uploadOfferPicture(image.file, newOffer._id)
			})

			history.push(AuthRoutes.home)
		} catch (response) {
			history.push(NonAuthRoutes.signIn)
		}
	}

	const isFormValid = (): boolean => {
		switch (activeStep) {
			case 0:
				return isOfferingInformationValid()
			case 1:
				return isValuesValid()
			default:
				return false
		}
	}

	const isOfferingInformationValid = (): boolean => {
		const offer = offerContext.offer
		return offer.title !== null &&
			offer.images.length > 0 &&
			offer.price !== null &&
			offer.roomSize !== null &&
			offer.moveInDate !== null &&
			offer.location.country !== "" &&
			offer.location.city !== "" &&
			offer.location.zipCode !== ""
	}

	const isValuesValid = (): boolean => {
		const offer = offerContext.offer
		return offer.values.filter(b => b.trim() !== "").length !== 0 && (offer.acceptedTerms ?? true) && offer.description !== ""
	}

	return (
		<React.Fragment>
			{DefaultAppBar("", CreateOfferingBreadCrumb(), "", false)}
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h4" align="center">
						Create your Offering
					</Typography>
					<Stepper activeStep={activeStep} connector={<ColorStepConnector />} className={classes.stepper}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						<React.Fragment>
							<CreateOfferingStepContext.Provider value={{ activeStep, setActiveStep }}>
								{getStepContent(activeStep)}
							</CreateOfferingStepContext.Provider>
							<div className={classes.buttons}>
								{activeStep !== 0 && (
									<Button onClick={handleBack} className={classes.button}>
										Back
									</Button>
								)}
								{activeStep === 0 && (
									<Button
										variant="contained"
										color="primary"
										disabled={!isFormValid()}
										onClick={handleNext}
										className={classes.button}
									>
										Next
									</Button>
								)}
								{activeStep === 1 && (
									<Button
										variant="contained"
										color="primary"
										disabled={!isFormValid()}
										onClick={handleCreateOffer}
										className={classes.button}
									>
										Create Offer
									</Button>
								)}
							</div>
						</React.Fragment>
					</React.Fragment>
				</Paper>
				<Copyright />
			</main>
		</React.Fragment>
	)
}
