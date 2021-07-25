import RoommateCards from "./RoommateCards"
import React, { createContext, useContext, useEffect, useState } from "react"
import { FindRoommateBreadCrumb } from "../../components/Breadcrumbs"
import DefaultAppBar from "../../components/DefaultAppBar"
import "./FindRoommateView.css"

// Context
import { UserContext } from "../../App"
import UserService from "../../services/UserService"
import { defaultApplicants, IUser, UserType } from "../../models/user"
import { defaultCurrentApplicant, ICurrentApplicant } from "../../models/currentApplicant"
import OfferService, { IReceivedHousingOffer } from "../../services/OfferService"
import ProfileService, { IReceivedImageMetaData } from "../../services/ProfileService"
import { ImageListType } from "react-images-uploading"
import { convertDataUrlToBlob } from "../../shared/convertDataUrlToBlob"
import { CircularProgress } from "@material-ui/core"
import { useLocation } from "react-router-dom"

interface ICurrentApplicantContextProps {
	currentApplicant: ICurrentApplicant
	setCurrentApplicant: React.Dispatch<React.SetStateAction<ICurrentApplicant>>
}

interface IApplicantsContextProps {
	applicants: IUser[]
	setApplicants: React.Dispatch<React.SetStateAction<IUser[]>>
}


export const ApplicantsContext = createContext({} as IApplicantsContextProps)
export const CurrentApplicantContext = createContext({} as ICurrentApplicantContextProps)

export default function FindRoommateView() {
	const userContext = useContext(UserContext)
	const [applicants, setApplicants] = useState(defaultApplicants)
	const [currentApplicant, setCurrentApplicant] = useState(defaultCurrentApplicant)
	const [isLoading, setLoading] = useState<boolean>(false)
	const location = useLocation();
	let offerId: any = location.state

	useEffect(() => {
		const fetchUsers = async () => {
			// Overwrite the local state with the response from the server
			const receivedUser = await UserService.getUserInfo()
			const newUser: IUser = {
				...receivedUser,
				password: "",
				images: userContext.user.images,
				acceptedTerms: true,
				type: receivedUser.userType === "Applicant" ? UserType.Applicant : UserType.Tenant
			}
			userContext.setUser(newUser)
		}
		fetchUsers()
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (applicants !== defaultApplicants) {
			setLoading(false)
		}
	}, [applicants])

	useEffect(() => {
		setLoading(true)
		const fetchUsers = async () => {
			// Overwrite the local state with the response from the server
			try {
				const receivedOffer: IReceivedHousingOffer = await OfferService.getOffer(offerId)
				const receivedApplicantIds = receivedOffer.applicants

				const receivedApplicants: IUser[] = []
				for (const applicantId of receivedApplicantIds) {
					const currentUser = await UserService.getUserInfoById(applicantId)

					const receivedImages: ImageListType = []
					const metaData: [IReceivedImageMetaData] = await ProfileService.getProfilePicturesMetaDataOfUser(applicantId)
					const receivedImage = await ProfileService.getProfilePicture(metaData[0].fileName)
					const blob = convertDataUrlToBlob(receivedImage.file, receivedImage.mime)
					const objectURL = URL.createObjectURL(blob)
					const createdFile = new File([blob], metaData[0].fileName, { type: receivedImage.mime })
					receivedImages.push({
						dataURL: objectURL,
						file: createdFile
					})

					receivedApplicants.push({
						...currentUser,
						images: receivedImages,
						type: UserType.Applicant,
						acceptedTerms: true,
						password: ""
					})
				}
				setApplicants(receivedApplicants)
			} catch (error) {
				// tslint:disable-next-line:no-console
				console.log("Error when requesting user: " + error)
			}
		}
		fetchUsers()
		// tslint-disable-next-line
	}, [])

	return (
		<React.Fragment>
			{DefaultAppBar(userContext.user.first_name, FindRoommateBreadCrumb(), "")}
			<div className="app">
				<ApplicantsContext.Provider value={{ applicants, setApplicants }}>
					<CurrentApplicantContext.Provider value={{ currentApplicant, setCurrentApplicant }}>
						{isLoading ? (
							<div className={"loading_circle"}>
								<CircularProgress color="secondary" />
							</div>
						) : (
							<RoommateCards offerId={offerId} />
						)}
					</CurrentApplicantContext.Provider>
				</ApplicantsContext.Provider>
			</div>
		</React.Fragment>

	)
}
