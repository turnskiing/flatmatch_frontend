import React from "react"
import { useHistory } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
// Steps
import PersonalInfromation from "./PersonalInformation"
import Interests from "./Interests"
import Welcome from "./Welcome"
// Componenets
import { Copyright } from "../../components/Copyright"
import { CreateProfileBreadCrumb } from "../../components/Breadcrumbs"
import DefaultAppBar from "../../components/DefaultAppBar"
// Styles
import { CreateProfileStyles } from "./CreateProfile.style"

const steps = ["Personal information", "Interests"]

function getStepContent(step: number) {
	switch (step) {
		case 0:
			return <PersonalInfromation />
		case 1:
			return <Interests />
		default:
			throw new Error("Unknown step")
	}
}

export default function CreateProfileView() {
	const history = useHistory()
	const classes = CreateProfileStyles()
	const [activeStep, setActiveStep] = React.useState(0)

	const handleNext = () => {
		setActiveStep(activeStep + 1)
	}

	const handleBack = () => {
		setActiveStep(activeStep - 1)
	}

	const handleContinue = () => {
		history.push("/home/find_room")
	}

	return (
		<React.Fragment>
			<CssBaseline />
			{DefaultAppBar("", CreateProfileBreadCrumb(), "", false)}
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h4" align="center">
						Create your Profile
					</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						{activeStep === steps.length ? (
							<Welcome />
						) : (
							<React.Fragment>
								{getStepContent(activeStep)}
								<div className={classes.buttons}>
									{activeStep !== 0 && (
										<Button onClick={handleBack} className={classes.button}>
											Back
										</Button>
									)}
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										{activeStep === steps.length - 1
											? "Create Profile"
											: "Next"}
									</Button>
								</div>
							</React.Fragment>
						)}
					</React.Fragment>
				</Paper>
				<Copyright />
			</main>
		</React.Fragment>
	)
}
