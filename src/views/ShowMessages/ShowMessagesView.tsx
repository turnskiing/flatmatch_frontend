import React, { useContext, useEffect, useState } from "react"
import { CircularProgress, List, ListItem, ListItemText, Paper } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

// Componenets
import { Copyright } from "../../components/Copyright"
import { ShowProfileBreadCrumb } from "../../components/Breadcrumbs"
import DefaultAppBar from "../../components/DefaultAppBar"
// Styles
import { ShowMessagesStyles } from "./ShowMessages.style"

import { defaultApplicants, IUser, UserType } from "../../models/user"
import { UserContext } from "../../App"
import UserService from "../../services/UserService"
import ProfileService, { IReceivedImageMetaData } from "../../services/ProfileService"
import { ImageListType } from "react-images-uploading"
import { convertDataUrlToBlob } from "../../shared/convertDataUrlToBlob"
import MatchService, { IReceivedMatch } from "../../services/MatchService"

export default function ShowProfile() {
	const userContext = useContext(UserContext)
	const classes = ShowMessagesStyles()
	const [matches, setMatches] = useState(defaultApplicants)
	const [isLoading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		setLoading(true)
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

			// Query Matches
			const receivedMatchUsers: IUser[] = []
			if(receivedUser.userType === "Applicant") {
				const receivedMatches = await MatchService.getMatchOfApplicant()
				for(const match of receivedMatches) {
					const matchUser = await UserService.getUserInfoById(match.tenant)
					receivedMatchUsers.push({
						...matchUser,
						images: [],
						type: UserType.Applicant,
						acceptedTerms: true,
						password: ""
					})
				}
			} else {
				const receivedMatches = await MatchService.getMatchOfTenant()
				for(const match of receivedMatches) {
					const matchUser = await UserService.getUserInfoById(match.applicant)
					receivedMatchUsers.push({
						...matchUser,
						images: [],
						type: UserType.Applicant,
						acceptedTerms: true,
						password: ""
					})
				}
			}
			setMatches(receivedMatchUsers)
		}
		fetchUsers()
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (matches !== defaultApplicants) {
			setLoading(false)
		}
	}, [matches])

	return (
		<React.Fragment>
			{DefaultAppBar(userContext.user.first_name, ShowProfileBreadCrumb(), "")}
			<div>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
							<Grid
								container
								spacing={3}
								direction="column"
								alignItems="center"
								justify="center"
							>
								<Grid item xs={12}>
									<Typography variant="h6">
										Messages
									</Typography>
								</Grid>
							</Grid>
						{isLoading ? (
							<div className={"loading_circle"}>
								<CircularProgress color="secondary" />
							</div>
						) : (
							<List>
							{matches.map((match, index) => {
								return (<ListItem key={index} alignItems="flex-start">
								<ListItemText
									  primary={`${match.first_name} ${match.last_name}`}
									  secondary={
										<React.Fragment>
										  <Typography
											component="span"
											variant="body2"
											color="textPrimary"
										  >
											{match.email}
										  </Typography>
										</React.Fragment>
									  }
								/>
								</ListItem>)
							})}
							</List>
						)}
					</Paper>
					<Copyright />
				</main>
			</div>
		</React.Fragment>
	)
}
