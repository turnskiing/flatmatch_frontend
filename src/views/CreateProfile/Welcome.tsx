import React, { useContext } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import { makeStyles } from "@material-ui/core/styles"
// Context
import { UserContext } from "../../App"
import { CreateProfileStepContext } from "./CreateProfileView"
// Models
import { IUser, UserType } from "../../models/user"

const WelcomeStyles = makeStyles((theme) => ({
	card: {
		minWidth: 250,
		margin: 20
	},
}))

export default function Welcome() {
	const userContext = useContext(UserContext)
	const stepContext = useContext(CreateProfileStepContext)
	const classes = WelcomeStyles()

	const handleApplicantClick = () => {
		const newUser: IUser = {
			...userContext.user,
			type: UserType.Applicant
		}
		userContext.setUser(newUser)
		stepContext.setActiveStep(stepContext.activeStep + 1)
	}

	const handleTennantClick = () => {
		const newUser: IUser = {
			...userContext.user,
			type: UserType.Tennant
		}
		userContext.setUser(newUser)
		stepContext.setActiveStep(stepContext.activeStep + 1)
	}

	return (
		<React.Fragment>
			<Typography variant="h5" gutterBottom>
				Welcome to FlatMatch
			</Typography>
			<Typography variant="subtitle1" style={{ paddingTop: 20 }}>
				We are happy to have you on board. There is one more important decision you
				need to make.
			</Typography>
			<Typography variant="subtitle1" style={{ paddingBottom: 20 }}>
				How do you want to use FlatMatch?
			</Typography>
			<div>
				<Grid
					container
					spacing={1}
					direction="row"
					justify="space-around"
					alignItems="center"
				>
					<Grid item xs={12} sm={6} justify="center" alignItems="center">
						<Card className={classes.card}>
							<CardActionArea onClick={handleApplicantClick}>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2" style={{ paddingTop: 20, paddingBottom: 20 }}>
										Find shared appartments
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										Find the right shared appartment by conveniently swiping throught all available offers that match your preferences.
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} justify="center">
						<Card className={classes.card}>
							<CardActionArea onClick={handleTennantClick}>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2" style={{ paddingTop: 20, paddingBottom: 20 }}>
										Offer shared appartments
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										Find the right roommates for your shared appartment by conveniently swiping throught all the applications you receive for your offering.
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>
			</div>
		</React.Fragment>
	)
}
