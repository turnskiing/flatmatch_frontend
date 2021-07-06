import React, { useContext, useEffect } from "react"
import { Paper } from "@material-ui/core"
import Avatar from "@material-ui/core/Avatar"
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"

// Componenets
import { Copyright } from "../../components/Copyright"
import { ShowProfileBreadCrumb } from "../../components/Breadcrumbs"
import DefaultAppBar from "../../components/DefaultAppBar"
// Styles
import { ShowProfileStyles } from "./ShowProfile.style"

import { IUser, UserType } from "../../models/user"
import { UserContext } from "../../App"
import UserService from "../../services/UserService"
import { Box } from "@material-ui/core"
import PersonalInfromation from "../CreateProfile/PersonalInformation"
import Interests from "../CreateProfile/Interests"

export default function ShowProfile() {
	const userContext = useContext(UserContext)
	const classes = ShowProfileStyles()
	const [isEditable, setIsEditable] = React.useState(false)

	const handleEdit = async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault()
		setIsEditable(!isEditable)
		try {
			await UserService.updateUser(userContext.user)
		} catch (response) {
			// tslint:disable-next-line:no-console
			console.log("Error when updating user: " + response)
		}
	}

	const isFormValid = (): boolean => {
		const user = userContext.user
		return user.first_name.trim() !== "" &&
			user.last_name.trim() !== "" &&
			user.gender !== null &&
			user.images.length > 0 &&
			user.date_of_birth !== null &&
			user.interests.filter(b => b.trim() !== "").length !== 0
	}

	useEffect(() => {
		const fetchUsers = async () => {
			// Overwrite the local state with the response from the server
			const receivedUser = await UserService.getUserInfo()
			const newUser: IUser = {
				...receivedUser,
				password: "",
				images: [],
				acceptedTerms: true,
				type:
					receivedUser.userType === "Applicant"
						? UserType.Applicant
						: UserType.Tenant,
			}
			userContext.setUser(newUser)
		}
		fetchUsers()
	}, [])

	return (
		<React.Fragment>
			{DefaultAppBar(userContext.user.first_name, ShowProfileBreadCrumb(), "")}
			<div>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Box display="flex" justifyContent="flex-end">
							<IconButton
								onClick={handleEdit}
								disabled={isEditable ? !isFormValid() : false}
							>
								{isEditable ? <SaveIcon /> : <EditIcon />}
							</IconButton>
						</Box>
						<React.Fragment>
							<Grid
								container
								spacing={3}
								direction="column"
								alignItems="center"
								justify="center"
							>
								<Grid item xs={12}>
									<Avatar
										src={userContext.user.images[0]}
										className={classes.avatar}
									></Avatar>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="h6">
										{userContext.user.first_name +
											" " +
											userContext.user.last_name}
									</Typography>
								</Grid>
							</Grid>
							<Box style={{ padding: 15 }} />
							{PersonalInfromation(isEditable)}
							<Box style={{ padding: 20 }} />
							{Interests(isEditable, false)}
							<Box style={{ padding: 30 }} />
						</React.Fragment>
					</Paper>
					<Copyright />
				</main>
			</div>
		</React.Fragment>
	)
}
