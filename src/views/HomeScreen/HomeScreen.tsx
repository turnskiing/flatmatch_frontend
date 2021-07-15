import React, { useContext } from "react"
import { Paper } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
// Componenets
import { Copyright } from "../../components/Copyright"
import { HomeBreadCrumb } from "../../components/Breadcrumbs"
import DefaultAppBar from "../../components/DefaultAppBar"
// Context
import { FilterContext, UserContext } from "../../App"
import { useHistory } from "react-router-dom"
// Styles
import { HomeScreenStyles } from "./HomeScreen.style"
// Icons
import SearchIcon from '@material-ui/icons/Search'
import { Box } from "@material-ui/core"
import MessageIcon from '@material-ui/icons/Message'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import SettingsIcon from '@material-ui/icons/Settings'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import { IUser, UserType } from "../../models/user"
import { AuthRoutes } from "../../Router"
import { useEffect } from "react"
import UserService from "../../services/UserService"
import FilterView from "../Filter/FilterView"
import { IFilter } from "../../models/filter"

export default function HomeScreenView() {
	const userContext = useContext(UserContext)
	const filterContext = useContext(FilterContext)
	const history = useHistory()
	const classes = HomeScreenStyles()

	const handleFindAppartment = () => {
		history.push(AuthRoutes.findRoom)
	}

	const handleCreateOffering = () => {
		history.push(AuthRoutes.createOffering)
	}

	const handleFindRoommates = () => {
		history.push(AuthRoutes.findApplicant)
	}

	const handleMyMessages = () => {
		history.push(AuthRoutes.messages)
	}

	const handleViewProfile = () => {
		history.push(AuthRoutes.profile)
	}

	const handlePersonalPreferences = () => {
		const newFilter: IFilter = {
			...filterContext.filter,
			isShown: true,
		}
		filterContext.setFilter(newFilter)
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
				type: receivedUser.userType === "Applicant" ? UserType.Applicant : UserType.Tenant
			}
			userContext.setUser(newUser)
		}
		fetchUsers()
		// eslint-disable-next-line
	}, [])

	return (
		<React.Fragment>
			{DefaultAppBar(userContext.user.first_name, HomeBreadCrumb(), "")}
			<div>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Typography component="h1" variant="h4" align="center" style={{ padding: 20 }}>
							Hello{" " + userContext.user.first_name}!
						</Typography>
						<React.Fragment>
							<React.Fragment>
								<div>
									<Grid
										container
										spacing={1}
										direction="row"
										justify="space-around"
										alignItems="center"
									>
										{userContext.user.type === UserType.Applicant && (
											<Grid item component={Card} xs={12} sm={6} className={classes.card}>
												<CardActionArea onClick={handleFindAppartment}>
													<CardContent>
														<Box display="flex" bgcolor="grey.200" justifyContent="center" className={classes.box}>
															<SearchIcon className={classes.icon} />
														</Box>
														<Typography
															gutterBottom
															align="center"
															variant="h5"
															component="h2"
															style={{ paddingTop: 40, paddingBottom: 0 }}
														>
															Find appartments
														</Typography>
													</CardContent>
												</CardActionArea>
											</Grid>
										)}
										{userContext.user.type === UserType.Tenant && (
											<Grid item component={Card} xs={12} sm={6} className={classes.card}>
												<CardActionArea onClick={handleCreateOffering}>
													<CardContent>
														<Box display="flex" bgcolor="grey.200" justifyContent="center" className={classes.box}>
															<LocalOfferIcon className={classes.icon} />
														</Box>
														<Typography
															gutterBottom
															align="center"
															variant="h5"
															component="h2"
															style={{ paddingTop: 40, paddingBottom: 0 }}
														>
															Create Offering
														</Typography>
													</CardContent>
												</CardActionArea>
											</Grid>
										)}
										{userContext.user.type === UserType.Tenant && (
											<Grid item component={Card} xs={12} sm={6} className={classes.card}>
												<CardActionArea onClick={handleFindRoommates}>
													<CardContent>
														<Box display="flex" bgcolor="grey.200" justifyContent="center" className={classes.box}>
															<SearchIcon className={classes.icon} />
														</Box>
														<Typography
															gutterBottom
															align="center"
															variant="h5"
															component="h2"
															style={{ paddingTop: 40, paddingBottom: 0 }}
														>
															Find roommate
														</Typography>
													</CardContent>
												</CardActionArea>
											</Grid>
										)}
										<Grid item component={Card} xs={12} sm={6} className={classes.card}>
											<CardActionArea onClick={handleMyMessages}>
												<CardContent>
													<Box display="flex" bgcolor="grey.200" justifyContent="center" className={classes.box}>
														<MessageIcon className={classes.icon} />
													</Box>
													<Typography
														gutterBottom
														align="center"
														variant="h5"
														component="h2"
														style={{ paddingTop: 40, paddingBottom: 0 }}
													>
														My messages
													</Typography>
												</CardContent>
											</CardActionArea>
										</Grid>
										<Grid item component={Card} xs={12} sm={6} className={classes.card}>
											<CardActionArea onClick={handleViewProfile}>
												<CardContent>
													<Box display="flex" bgcolor="grey.200" justifyContent="center" className={classes.box}>
														<AccountBoxIcon className={classes.icon} />
													</Box>
													<Typography
														gutterBottom
														align="center"
														variant="h5"
														component="h2"
														style={{ paddingTop: 40, paddingBottom: 0 }}
													>
														View Profile
													</Typography>
												</CardContent>
											</CardActionArea>
										</Grid>
										{userContext.user.type === UserType.Applicant && (
											<Grid item component={Card} xs={12} sm={6} className={classes.card}>
												<CardActionArea onClick={handlePersonalPreferences}>
													<CardContent>
														<Box display="flex" bgcolor="grey.200" justifyContent="center" className={classes.box}>
															<SettingsIcon className={classes.icon} />
														</Box>
														<Typography
															gutterBottom
															align="center"
															variant="h5"
															component="h2"
															style={{ paddingTop: 40, paddingBottom: 0 }}
														>
															Personal preferences
														</Typography>
													</CardContent>
												</CardActionArea>
											</Grid>
										)}
									</Grid>
									< FilterView />
								</div>
							</React.Fragment>
						</React.Fragment>
					</Paper>
					<Copyright />
				</main>
			</div>
		</React.Fragment>
	)
}
