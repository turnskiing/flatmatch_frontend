import React, { useContext } from "react"
import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import StepConnector from '@material-ui/core/StepConnector'
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
import { withStyles } from '@material-ui/core/styles'
import grey from "@material-ui/core/colors/grey"
// Context
import { UserContext } from "../../App"
import { useHistory } from "react-router-dom"
import UserService from "../../services/UserService"
import { AuthRoutes, NonAuthRoutes } from "../../Router"
import { UserType } from "../../models/user"
import FilterService from "../../services/FilterService"
import { defaultFilter } from "../../models/filter"
import ProfileService from "../../services/ProfileService"

const steps = ["Welcome", "Personal information", "Interests"]

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
			return <Welcome />
		case 1:
			return <PersonalInfromation{...true} />
		case 2:
			return <Interests{...true} />
		default:
			throw new Error("Unknown step")
	}
}

interface IContextProps {
	activeStep: number
	setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

export const CreateProfileStepContext = React.createContext({} as IContextProps)

export default function CreateProfileView() {
	const userContext = useContext(UserContext)
	const history = useHistory()
	const classes = CreateProfileStyles()
	const [activeStep, setActiveStep] = React.useState(0)

	const handleNext = () => {
		setActiveStep(activeStep + 1)
	}

	const handleBack = () => {
		setActiveStep(activeStep - 1)
	}

	const handleCreateProfile = async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault()
		try {
			await UserService.signUp(userContext.user)
			await UserService.updateUser(userContext.user)
			if (userContext.user.type === UserType.Applicant) {
				// Create Filter with some default values
				await FilterService.createFilter({
					...defaultFilter
				})
			}

			userContext.user.images.map(async (image) => {
				// Upload all new images
				if (!image.file?.name.startsWith(UserService.getCurrentUser()._id, 0)) {
					await ProfileService.uploadProfilePicture(image.file)
				}
			})
			history.push(AuthRoutes.home)
		} catch (response) {
			history.push(NonAuthRoutes.signIn)
		}
	}

	const isFormValid = (): boolean => {
		switch (activeStep) {
			case 0:
				return true
			case 1:
				return isPersonalInformationValid()
			case 2:
				return isInterestsValid()
			default:
				return false
		}
	}

	const isPersonalInformationValid = (): boolean => {
		const user = userContext.user
		return user.first_name.trim() !== "" &&
			user.last_name.trim() !== "" &&
			user.gender !== null &&
			user.images.length > 0 &&
			user.date_of_birth !== null
	}

	const isInterestsValid = (): boolean => {
		const user = userContext.user
		return user.interests.filter(b => b.trim() !== "").length !== 0 &&
			user.acceptedTerms === true
	}

	return (
		<React.Fragment>
			{DefaultAppBar("", CreateProfileBreadCrumb(), "", false)}
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h4" align="center">
						Create your Profile
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
							<CreateProfileStepContext.Provider value={{ activeStep, setActiveStep }}>
								{getStepContent(activeStep)}
							</CreateProfileStepContext.Provider>
							<div className={classes.buttons}>
								{activeStep !== 0 && (
									<Button onClick={handleBack} className={classes.button}>
										Back
									</Button>
								)}
								{activeStep === 1 && (
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
								{activeStep === 2 && (
									<Button
										variant="contained"
										color="primary"
										disabled={!isFormValid()}
										onClick={handleCreateProfile}
										className={classes.button}
									>
										Create Profile
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
