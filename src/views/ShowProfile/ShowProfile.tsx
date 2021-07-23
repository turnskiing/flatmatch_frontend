import React, { useContext, useEffect, useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from "@material-ui/core"
import Avatar from "@material-ui/core/Avatar"
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
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
import { Box, CircularProgress } from "@material-ui/core"
import PersonalInfromation from "../CreateProfile/PersonalInformation"
import Interests from "../CreateProfile/Interests"
import ProfileService, { IReceivedImageMetaData } from "../../services/ProfileService"
import { ImageListType } from "react-images-uploading"
import { convertDataUrlToBlob } from "../../shared/convertDataUrlToBlob"

export default function ShowProfile() {
	const userContext = useContext(UserContext)
	const classes = ShowProfileStyles()
	const [isEditable, setIsEditable] = React.useState(false)
	const [isLoading, setLoading] = useState<boolean>(false)
	const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

	const handleEdit = async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault()
		setIsEditable(!isEditable)
		// Execute only on save
		if (isEditable) {
			try {
				await UserService.updateUser(userContext.user)

				// Get MetaData of saved pictures
				const metaData = await ProfileService.getProfilePicturesMetaData()
				// Delete all unused images
				metaData.map(async (image) => {
					const foundImages = userContext.user.images.filter(i => i.file?.name === image.fileName)
					if (foundImages.length === 0) {
						await ProfileService.deleteProfilePicture(image.fileName)
					}
				})

				userContext.user.images.map(async (image) => {
					// Upload all new images
					if (!image.file?.name.startsWith(UserService.getCurrentUser()._id, 0)) {
						await ProfileService.uploadProfilePicture(image.file)
					}
				})
			} catch (response) {
				// tslint:disable-next-line:no-console
				console.log("Error when updating user: " + response)
			}
		}
	}

	const handleDelete = async (event: React.MouseEvent<HTMLElement>) => {
		try {
			if (await UserService.deleteUser()) {
				handleClose()
				UserService.logout()
			}
		} catch (response) {
			// tslint:disable-next-line:no-console
			console.log("Error when deleting user: " + response)
			handleClose()
		}
	}

	const handleClose = () => {
		setShowDeleteDialog(false)
	}

	const handleShowDeleteDialog = (event: React.MouseEvent<HTMLElement>) => {
		setShowDeleteDialog(true)
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
		setLoading(true)
		const fetchUsers = async () => {
			// Overwrite the local state with the response from the server
			const receivedUser = await UserService.getUserInfo()
			const metaData: [IReceivedImageMetaData] = await ProfileService.getProfilePicturesMetaData()

			const receivedImages: ImageListType = []
			for (const data of metaData) {
				const receivedImage = await ProfileService.getProfilePicture(data.fileName)
				const blob = convertDataUrlToBlob(receivedImage.file, receivedImage.mime)
				const objectURL = URL.createObjectURL(blob)
				const createdFile = new File([blob], data.fileName, { type: receivedImage.mime })
				receivedImages.push({
					dataURL: objectURL,
					file: createdFile
				})
			}

			const newUser: IUser = {
				...receivedUser,
				password: "",
				images: receivedImages,
				acceptedTerms: true,
				type:
					receivedUser.userType === "Applicant"
						? UserType.Applicant
						: UserType.Tenant,
			}
			userContext.setUser(newUser)
			setLoading(false)
		}
		fetchUsers()
		// eslint-disable-next-line
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
							<IconButton onClick={handleShowDeleteDialog}>
								<DeleteIcon />
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
								{isLoading ? (
									<Grid item xs={12} style={{ padding: 70 }}>
										<CircularProgress color="secondary" />
									</Grid>
								) : (
									<Grid item xs={12}>
										<Avatar
											src={userContext.user.images[0] !== undefined ? userContext.user.images[0].dataURL : ""}
											className={classes.avatar}
										></Avatar>
									</Grid>
								)}
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
							<Dialog
								open={showDeleteDialog}
								onClose={handleClose}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<DialogTitle id="alert-dialog-title">{"Do you want to DELETE your account?"}</DialogTitle>
								<DialogContent>
									<DialogContentText id="alert-dialog-description">
										Deleting the account is permanent and can not be undone. Are you sure you want to delete it?
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleClose} color="primary">
										Cancle
									</Button>
									<Button onClick={handleDelete} color="primary" autoFocus>
										Delete
									</Button>
								</DialogActions>
							</Dialog>
						</React.Fragment>
					</Paper>
					<Copyright />
				</main>
			</div>
		</React.Fragment>
	)
}
